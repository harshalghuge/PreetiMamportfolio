import { useState, useEffect, useRef } from "react";


// ----------------- CONFIG -----------------
const WP_BASE = "https://blog.preetitoraskar.com/wp-json/wp/v2";

const CATEGORIES = [
  { id: "all", label: "All Posts" },
  { id: "soultales", label: "SoulTales" }, 
  { id: "youngsoul", label: "Young SoulTales" },
  { id: "kaifiyat", label: "Kaifiyat" },
];

const POSTS_PER_PAGE = 6;
const CACHE_TTL_MS = 5 * 60 * 1000;
const LIST_POST_FIELDS = ["id", "date", "title", "excerpt", "content", "link", "featured_media", "_embedded"].join(",");
const postsCache = new Map();
const ARTICLE_CONTENT_CLASS =
  [
    "max-w-none text-gray-800",
    "[&_p]:my-5 [&_p]:leading-8 [&_p]:text-[1.06rem]",
    "[&_strong]:font-bold [&_b]:font-bold",
    "[&_em]:italic",
    "[&_h1]:text-4xl [&_h1]:leading-tight [&_h1]:font-extrabold [&_h1]:mt-10 [&_h1]:mb-5",
    "[&_h2]:text-3xl [&_h2]:leading-tight [&_h2]:font-bold [&_h2]:mt-9 [&_h2]:mb-4",
    "[&_h3]:text-2xl [&_h3]:leading-snug [&_h3]:font-bold [&_h3]:mt-8 [&_h3]:mb-4",
    "[&_h4]:text-xl [&_h4]:leading-snug [&_h4]:font-semibold [&_h4]:mt-7 [&_h4]:mb-3",
    "[&_h5]:text-lg [&_h5]:font-semibold [&_h5]:mt-6 [&_h5]:mb-3",
    "[&_h6]:text-base [&_h6]:font-semibold [&_h6]:mt-6 [&_h6]:mb-3",
    "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-5 [&_ul]:space-y-2",
    "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-5 [&_ol]:space-y-2",
    "[&_li]:leading-8",
    "[&_blockquote]:my-8 [&_blockquote]:pl-5 [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:text-gray-600 [&_blockquote]:italic",
    "[&_a]:text-gray-900 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-gray-700",
    "[&_figure]:my-8 [&_figcaption]:mt-3 [&_figcaption]:text-sm [&_figcaption]:text-gray-500 [&_figcaption]:text-center",
    "[&_img]:my-8 [&_img]:w-full [&_img]:h-auto [&_img]:rounded-xl",
    "[&_hr]:my-10 [&_hr]:border-gray-200",
    "[&_table]:w-full [&_table]:my-7 [&_table]:text-sm [&_table]:border-collapse",
    "[&_th]:border [&_th]:border-gray-200 [&_th]:px-3 [&_th]:py-2 [&_th]:bg-gray-50 [&_th]:text-left [&_th]:font-semibold",
    "[&_td]:border [&_td]:border-gray-200 [&_td]:px-3 [&_td]:py-2",
    "[&_.wp-block-image]:my-8 [&_.wp-block-image_img]:my-0",
    "[&_.wp-block-quote]:my-8 [&_.wp-block-quote]:pl-5 [&_.wp-block-quote]:border-l-4 [&_.wp-block-quote]:border-gray-300",
    "[&_.wp-block-heading]:tracking-tight",
  ].join(" ");

// ----------------- HELPERS -----------------
const stripHtml = (html = "") => html.replace(/<[^>]*>/g, "");

const getFirstImageFromHtml = (html = "") => {
  // Try src first, then data-src (lazy-loaded images), then data-lazy-src
  const srcMatch = html.match(/<img[^>]+\bsrc=["']([^"']+)["']/i);
  if (srcMatch?.[1] && !srcMatch[1].startsWith("data:")) return srcMatch[1];
  const dataSrcMatch = html.match(/<img[^>]+\bdata-src=["']([^"']+)["']/i);
  if (dataSrcMatch?.[1]) return dataSrcMatch[1];
  const dataLazySrcMatch = html.match(/<img[^>]+\bdata-lazy-src=["']([^"']+)["']/i);
  return dataLazySrcMatch?.[1] || null;
};

const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const readTime = (content) =>
  Math.max(1, Math.ceil(stripHtml(content).split(/\s+/).length / 200)) +
  " min read";

const normalizeSlug = (s = "") => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const decodeHtmlEntities = (text = "") => {
  if (typeof window === "undefined" || typeof document === "undefined") return text;
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
};

const getImage = (post) => {
  // 1. Featured media source_url (most reliable)
  const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0];
  if (featuredMedia?.source_url) return featuredMedia.source_url;

  // 2. Media details sizes (different resolutions)
  const sizes = featuredMedia?.media_details?.sizes;
  if (sizes) {
    const sizeUrl =
      sizes.large?.source_url ||
      sizes.medium_large?.source_url ||
      sizes.medium?.source_url ||
      sizes.full?.source_url;
    if (sizeUrl) return sizeUrl;
  }

  // 3. yoast_head_json og_image (SEO meta often has image)
  const ogImage = post.yoast_head_json?.og_image?.[0]?.url;
  if (ogImage) return ogImage;

  // 4. Extract from rendered content HTML (handles lazy-loaded images too)
  return getFirstImageFromHtml(post.content?.rendered || "") || null;
};
  


const getExcerpt = (post) =>
  decodeHtmlEntities(
    stripHtml(
      post.excerpt?.rendered || post.content?.rendered || "",
    ),
  )
    .slice(0, 140) + "...";


const getAuthor = (post) =>
  post._embedded?.author?.[0]?.name || "Preeti Toraskar";

const getCategory = (post) => post._embedded?.["wp:term"]?.[0]?.[0]?.name || "";

// ----------------- HOOK fetch from WordPress REST API -----------------
function usePosts({ categorySlug, search, page }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [catIdMap, setCatIdMap] = useState({});

  useEffect(() => {
    fetch(`${WP_BASE}/categories?per_page=100`)
      .then((r) => (r.ok ? r.json() : []))
      .then((cats) => {
        const map = {};
        cats.forEach((c) => {
          map[normalizeSlug(c.slug)] = c.id;
        });
        setCatIdMap(map);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    const normalizedCategory = normalizeSlug(categorySlug);
    const catId =
      normalizedCategory && normalizedCategory !== "all"
        ? catIdMap[normalizedCategory]
        : null;
    const params = new URLSearchParams({
      _embed: 1,
      _fields: LIST_POST_FIELDS,
      per_page: POSTS_PER_PAGE,
      page,
      ...(catId && { categories: catId }),
      ...(search && { search }),
    });

    const cacheKey = params.toString();
    const cached = postsCache.get(cacheKey);
    if (cached && Date.now() < cached.expiresAt) {
      setPosts(cached.data);
      setTotalPages(cached.totalPages);
      setLoading(false);
      setHasLoadedOnce(true);
      return () => controller.abort();
    }

    fetch(`${WP_BASE}/posts?${params}`, { signal: controller.signal })
      .then((res) => {
        const pages = parseInt(res.headers.get("X-WP-TotalPages") || "1", 10);
        if (!res.ok) throw new Error("Could not load posts");
        return res.json().then((data) => ({ data, pages }));
      })
      .then(({ data, pages }) => {
        setPosts(data);
        setTotalPages(pages);
        setHasLoadedOnce(true);
        postsCache.set(cacheKey, {
          data,
          totalPages: pages,
          expiresAt: Date.now() + CACHE_TTL_MS,
        });
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err.message);
        setHasLoadedOnce(true);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => controller.abort();
  }, [categorySlug, search, page, catIdMap]);

  return { posts, loading, hasLoadedOnce, error, totalPages };
}

function useLatestPost() {
  const [latestPost, setLatestPost] = useState(null);

  useEffect(() => {
    fetch(`${WP_BASE}/posts?_embed=1&per_page=1&page=1`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setLatestPost(data?.[0] || null))
      .catch(() => setLatestPost(null));
  }, []);

  return latestPost;
}
// ----------------- FEATURED HERO POST -----------------
function FeaturedPost({ post, onOpen }) {
  if (!post) return null;
  const image = getImage(post);

  return (
    <div
      onClick={() => onOpen(post)}
      className={`group flex flex-col ${image ? "md:flex-row md:h-[390px]" : ""} rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer bg-white mb-12`}
    >
      {/* Image */}
      {image && (
        <div className="relative min-h-[280px] md:min-h-0 md:h-full md:w-1/2 overflow-hidden bg-gray-100">
          <img
            src={image}
            alt=""
            onError={(e) => { e.currentTarget.parentElement.style.display = "none"; }}
            className="absolute inset-0 !w-full !h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />
          {getCategory(post) && (
            <span className="absolute top-4 left-4 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              {getCategory(post)}
            </span>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col justify-center p-6 lg:p-8 bg-gray-50 md:h-full md:w-1/2">
        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-2">
          Latest Post
        </p>
        <p className="text-xs text-gray-400 mb-3 tracking-wide">
          {formatDate(post.date)} | {readTime(post.content?.rendered || "")}
        </p>
        <h2
          className="text-2xl lg:text-[2rem] font-bold leading-tight tracking-tight text-gray-900 mb-3"
          dangerouslySetInnerHTML={{ __html: post.title?.rendered }}
        />
        <p className="text-gray-500 leading-relaxed mb-2 text-sm">
          {getExcerpt(post)}
        </p>
        <p className="text-xs text-gray-400 mb-5">By {getAuthor(post)}</p>
        <button className="self-start bg-gray-900 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-gray-700 transition-colors duration-200">
          Read Article
        </button>
      </div>
    </div>
  );
}
// ----------------- BLOG CARD -----------------
function BlogCard({ post, onOpen }) {
  const image = getImage(post);
  return (
    <div
      onClick={() => onOpen(post)}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden cursor-pointer shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-250"
    >
      {/* Thumbnail */}
      {image && (
        <div className="overflow-hidden h-52">
          <img
            src={image}
            alt=""
            onError={(e) => { e.currentTarget.parentElement.parentElement.removeChild(e.currentTarget.parentElement); }}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      {/* Body */}
      <div className="p-5">
        {getCategory(post) && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">
            {getCategory(post)}
          </span>
        )}
        <h3
          className="text-base font-bold leading-snug tracking-tight text-gray-900 mb-2"
          dangerouslySetInnerHTML={{ __html: post.title?.rendered }}
        />
        <p className="text-gray-500 text-sm leading-relaxed mb-4">
          {getExcerpt(post)}
        </p>
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs text-gray-300">{formatDate(post.date)}</span>
          <span className="text-xs text-gray-300">
            {readTime(post.excerpt?.rendered || "")}
          </span>
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-gray-900 transition-colors duration-200">
          Read More
        </span>
      </div>
    </div>
  );
}
// ----------------- SKELETON LOADER -----------------
function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mb-10">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse"
        >
          <div className="h-52 bg-gray-100" />
          <div className="p-5 space-y-3">
            <div className="h-3 bg-gray-100 rounded w-2/5" />
            <div className="h-3 bg-gray-100 rounded w-4/5" />
            <div className="h-3 bg-gray-100 rounded w-full" />
            <div className="h-3 bg-gray-100 rounded w-3/5" />
          </div>
        </div>
      ))}
    </div>
  );
}

function LoadingSpinner({ text = "Loading posts...", compact = false }) {
  return (
    <div
      className={`flex flex-col items-center justify-center ${compact ? "py-5" : "py-16"}`}
    >
      <div
        className={`${compact ? "h-7 w-7 border-2" : "h-10 w-10 border-4"} rounded-full border-gray-200 border-t-gray-800 animate-spin`}
      />
      <p className={`${compact ? "mt-2 text-xs" : "mt-3 text-sm"} text-gray-500`}>
        {text}
      </p>
    </div>
  );
}
// ----------------- ARTICLE MODAL -----------------
function ArticleModal({ post, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  if (!post) return null;

  return (
    <div className="fixed inset-0 z-[1200] bg-white overflow-y-auto">
      <div className="w-full min-h-screen relative animate-[fadeUp_0.3s_ease]">
        <button
          onClick={onClose}
          className="fixed top-5 right-5 z-30 inline-flex items-center justify-center bg-white/95 border border-gray-200 text-gray-700 shadow-sm hover:bg-gray-100 transition-colors h-10 w-10 rounded-full md:h-auto md:w-auto md:rounded-full md:px-4 md:py-2 md:gap-2 md:min-w-[150px] md:whitespace-nowrap"
          title="Close (Esc)"
        >
          <span className="text-lg leading-none md:hidden" aria-hidden="true">
            ×
          </span>
          <span className="hidden md:inline" aria-hidden="true">
            ←
          </span>
          <span className="hidden md:inline text-sm font-semibold">
            Back to Blogs
          </span>
        </button>

        <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-20 pb-12 md:pt-14 md:pb-14">
          <h1
            className="text-[2.2rem] md:text-6xl font-extrabold tracking-tight leading-[1.08] text-gray-900 mb-5 md:mb-8"
            dangerouslySetInnerHTML={{ __html: post.title?.rendered }}
          />

          <div className="flex flex-wrap gap-2 items-center text-xs text-gray-400 tracking-wide mb-4">
            {getCategory(post) && (
              <span className="bg-gray-900 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                {getCategory(post)}
              </span>
            )}
            <span>{formatDate(post.date)}</span>
            <span>|</span>
            <span>{readTime(post.content?.rendered || "")}</span>
            <span>|</span>
            <span>By {getAuthor(post)}</span>
          </div>

          <div
            className={ARTICLE_CONTENT_CLASS}
            dangerouslySetInnerHTML={{ __html: post.content?.rendered }}
          />

          <div className="flex flex-wrap justify-between items-center mt-10 pt-6 border-t border-gray-100 gap-4">
            <button
              onClick={onClose}
              className="bg-gray-900 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-gray-700 transition-colors"
            >
              Back to Blog
            </button>
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
            >
              Open on WordPress
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [err, setErr] = useState("");

  const submit = async () => {
  if (!email.includes("@") || !email.includes(".")) {
    setErr("Please enter a valid email.");
    return;
  }

  setErr("");

  try {
    const res = await fetch(
      "https://blog.preetitoraskar.com/wp-json/newsletter/v1/subscribe",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Subscription failed");
    }

    setSubmitted(true);

  } catch (err) {
    setErr(err.message);
  }
};

  return (
    <div className="bg-gray-900 text-white rounded-2xl px-6 py-16 text-center mb-20">
      <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">
        Stay Updated
      </p>
      <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
        New posts in your inbox
      </h3>
      <p className="text-gray-400 text-sm mb-8">
        No spam. Unsubscribe any time.
      </p>

      {submitted ? (
        <p className="text-green-400 font-semibold text-base">
          You're subscribed - thank you!
        </p>
      ) : (
        <>
          <div className="flex flex-wrap justify-center items-center gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              className="flex-1 min-w-[200px] px-5 py-3 rounded-full text-white text-sm outline-none border-2"
            />
            <button
              onClick={submit}
              className="bg-white text-gray-900 text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-gray-100 transition-colors"
            >
              Subscribe
            </button>
          </div>
          {err && <p className="text-red-400 text-xs mt-3">{err}</p>}
        </>
      )}
    </div>
  );
}
// ----------------- MAIN PAGE -----------------
export function Blog() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [openPost, setOpenPost] = useState(null);
  const gridRef = useRef(null);

  const { posts, loading, hasLoadedOnce, error, totalPages } = usePosts({
    categorySlug: activeCategory,
    search: searchQuery,
    page,
  });
  const latestPost = useLatestPost();

  useEffect(() => {
    setPage(1);
  }, [activeCategory, searchQuery]);

  const handleCategory = (slug) => {
    setActiveCategory(slug);
    setSearchQuery("");
    setSearchInput("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput.trim());
    setActiveCategory("all");
  };

  const goToPage = (p) => {
    setPage(p);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleOpenPost = async (post) => {
    if (post?.content?.rendered) {
      setOpenPost(post);
      return;
    }

    try {
      const res = await fetch(`${WP_BASE}/posts/${post.id}?_embed=1`);
      if (!res.ok) {
        setOpenPost(post);
        return;
      }
      const fullPost = await res.json();
      setOpenPost(fullPost);
    } catch {
      setOpenPost(post);
    }
  };

  const showFeatured =
    !error && !!latestPost && page === 1 && !searchQuery;
  const cardsToShow =
    showFeatured && activeCategory === "all"
      ? posts.filter((p) => p.id !== latestPost.id)
      : posts;

  return (
    <>
      

      {/* Keyframes for modal animation */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 font-serif text-gray-900">
        {/* ----------------- PAGE HERO ----------------- */}
        <section className="text-center pt-20 md:pt-24 pb-14">
          <p className="text-[10px] uppercase tracking-[0.22em] text-gray-400 font-semibold mb-4 mt-4">
            The Creative Room
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-none mb-4">
            Blog
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-sm mx-auto mb-8 font-sans font-normal leading-relaxed">
            Stories on parenting, creativity &amp; the soul of everyday life
          </p>

          {/* Search — unified pill bar */}
          <form
            onSubmit={handleSearch}
            className="flex items-center max-w-md mx-auto bg-gray-50 border border-gray-200 rounded-full px-2 py-1.5 focus-within:border-gray-400 transition-colors"
          >
            <input
              type="text"
              placeholder="Search articles…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-1 bg-transparent outline-none px-4 py-1.5 text-sm text-gray-700 font-sans placeholder:text-gray-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => { setSearchInput(""); setSearchQuery(""); }}
                className="text-gray-300 hover:text-gray-500 transition-colors font-sans text-base px-2 leading-none"
                aria-label="Clear"
              >
                ×
              </button>
            )}
            <button
              type="submit"
              className="bg-gray-900 text-white text-[10px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-full hover:bg-gray-700 transition-colors font-sans whitespace-nowrap"
            >
              Search
            </button>
          </form>
        </section>

        {/* ----------------- FEATURED POST ----------------- */}
        {showFeatured && <FeaturedPost post={latestPost} onOpen={handleOpenPost} />}

        {/* ----------------- CATEGORY BUTTONS ----------------- */}
        <section ref={gridRef} className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategory(cat.id)}
              className={`px-5 py-2 rounded-full border text-sm font-sans font-medium tracking-wide transition-all duration-200
                ${
                  activeCategory === cat.id
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </section>

        {/* ----------------- POSTS GRID ----------------- */}
        <section className="pb-12">
          {!hasLoadedOnce && loading && (
            <>
              <LoadingSpinner />
              <SkeletonGrid />
            </>
          )}

          {hasLoadedOnce && loading && cardsToShow.length > 0 && (
            <LoadingSpinner text="Updating posts..." compact />
          )}

          {error && !loading && (
            <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-2xl">
              <p className="text-4xl mb-3"></p>
              <p className="font-bold text-gray-700 mb-1">
                Couldn't load posts
              </p>
              <p className="text-gray-400 text-sm">{error}</p>
              <p className="text-gray-300 text-xs mt-2">
                Make sure{" "}
                <code className="bg-gray-100 px-1 rounded">
                  blog.preetitoraskar.com
                </code>{" "}
                is live and CORS is configured.
              </p>
            </div>
          )}

          {hasLoadedOnce && !loading && !error && cardsToShow.length === 0 && (
            <div className="text-center py-20">
              <p className="text-4xl mb-3"></p>
              <p className="font-bold text-gray-700 mb-1">No posts found</p>
              <p className="text-gray-400 text-sm">
                {searchQuery
                  ? `No results for "${searchQuery}"  try another term.`
                  : "This category has no posts yet. Add some in WordPress!"}
              </p>
            </div>
          )}

          {!error && cardsToShow.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mb-10">
                {cardsToShow.map((post) => (
                  <BlogCard key={post.id} post={post} onOpen={handleOpenPost} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center flex-wrap gap-2 mt-4">
                  <button
                    disabled={page <= 1}
                    onClick={() => goToPage(page - 1)}
                    className="px-4 py-2 rounded-full border border-gray-200 text-sm font-sans text-gray-500 hover:border-gray-400 disabled:opacity-30 transition-colors"
                  >
                     Prev
                  </button>

                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => goToPage(i + 1)}
                      className={`px-4 py-2 rounded-full border text-sm font-sans transition-all ${
                        page === i + 1
                          ? "bg-gray-900 text-white border-gray-900"
                          : "border-gray-200 text-gray-500 hover:border-gray-400"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    disabled={page >= totalPages}
                    onClick={() => goToPage(page + 1)}
                    className="px-4 py-2 rounded-full border border-gray-200 text-sm font-sans text-gray-500 hover:border-gray-400 disabled:opacity-30 transition-colors"
                  >Next</button>
                </div>
              )}
            </>
          )}
        </section>

        {/* ----------------- NEWSLETTER ----------------- */}
        <Newsletter />
      </main>

      {/* ----------------- ARTICLE MODAL ----------------- */}
      {openPost && (
        <ArticleModal post={openPost} onClose={() => setOpenPost(null)} />
      )}
    </>
  );
}
