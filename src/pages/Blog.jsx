import { useState, useEffect, useRef, useCallback } from "react";

// ─── CONFIG ────────────────────────────────────────────────────
const WP_BASE = "https://blog.preetitoraskar.com/wp-json/wp/v2";

const CATEGORIES = [
  { id: "all", label: "ALL" },
  { id: "soultales", label: "SoulTales" },
  { id: "youngsoul", label: "Young SoulTales" },
  { id: "kaifiyat", label: "Kaifiyat" },
];

// ── Update avatar URL to your real WordPress media URL ──
const AUTHOR = {
  name: "Preeti Toraskar",
  avatar: "https://miro.medium.com/v2/resize:fill:176:176/1*5nzAvJ4FST4C1x_Kb4RdZg.jpeg",
  bio: "Founder at SoulTales & Young SoulTales | Helping Adults and Children come back to themselves | Mother",
  followers: "36",
  wpUrl: "https://blog.preetitoraskar.com",
};

const POSTS_PER_BATCH = 10;
const CACHE_TTL_MS = 5 * 60 * 1000;
const postsCache = new Map();
let catIdMapCache = null;

const ARTICLE_CONTENT_CLASS = [
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

// ─── HELPERS ───────────────────────────────────────────────────
const stripHtml = (html = "") => html.replace(/<[^>]*>/g, "");

const getFirstImageFromHtml = (html = "") => {
  const m1 = html.match(/<img[^>]+\bsrc=["']([^"']+)["']/i);
  if (m1?.[1] && !m1[1].startsWith("data:")) return m1[1];
  const m2 = html.match(/<img[^>]+\bdata-src=["']([^"']+)["']/i);
  if (m2?.[1]) return m2[1];
  const m3 = html.match(/<img[^>]+\bdata-lazy-src=["']([^"']+)["']/i);
  return m3?.[1] || null;
};

const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const timeAgo = (d) => {
  const s = (Date.now() - new Date(d)) / 1000;
  if (s < 3600) return Math.floor(s / 60) + "m ago";
  if (s < 86400) return Math.floor(s / 3600) + "h ago";
  if (s < 604800) return Math.floor(s / 86400) + "d ago";
  return formatDate(d);
};

const readTime = (c) =>
  Math.max(1, Math.ceil(stripHtml(c).split(/\s+/).length / 200)) + " min read";

const normalizeSlug = (s = "") => s.toLowerCase().replace(/[^a-z0-9]/g, "");

const decodeHtmlEntities = (t = "") => {
  if (typeof window === "undefined") return t;
  const ta = document.createElement("textarea");
  ta.innerHTML = t;
  return ta.value;
};

const getImage = (post) => {
  const fm = post._embedded?.["wp:featuredmedia"]?.[0];
  if (fm?.source_url) return fm.source_url;
  const sz = fm?.media_details?.sizes;
  if (sz) {
    const u =
      sz.medium_large?.source_url ||
      sz.large?.source_url ||
      sz.medium?.source_url ||
      sz.full?.source_url;
    if (u) return u;
  }
  const og = post.yoast_head_json?.og_image?.[0]?.url;
  if (og) return og;
  return getFirstImageFromHtml(post.content?.rendered || "") || null;
};

const getExcerpt = (p) =>
  decodeHtmlEntities(
    stripHtml(p.excerpt?.rendered || p.content?.rendered || ""),
  ).slice(0, 140) + "...";
const getAuthor = (p) => p._embedded?.author?.[0]?.name || AUTHOR.name;
const getCategory = (p) => p._embedded?.["wp:term"]?.[0]?.[0]?.name || "";

// ─── HOOK — infinite scroll ─────────────────────────────────────
function usePosts({ categorySlug, search }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [catIdMap, setCatIdMap] = useState(catIdMapCache || {});

  // Category map — fetch once, cache in module scope
  useEffect(() => {
    if (catIdMapCache) {
      setCatIdMap(catIdMapCache);
      return;
    }
    fetch(`${WP_BASE}/categories?per_page=100`)
      .then((r) => (r.ok ? r.json() : []))
      .then((cats) => {
        const map = {};
        cats.forEach((c) => {
          map[normalizeSlug(c.slug)] = c.id;
        });
        catIdMapCache = map;
        setCatIdMap(map);
      })
      .catch(() => {});
  }, []);

  // Reset on filter change
  useEffect(() => {
    setPosts([]);
    setPage(1);
    setHasMore(true);
    setHasLoadedOnce(false);
    setError(null);
  }, [categorySlug, search]);

  const fetchPage = useCallback(
    (pageNum, append) => {
      const ctrl = new AbortController();
      const normalized = normalizeSlug(categorySlug);
      const catId =
        normalized && normalized !== "all" ? catIdMap[normalized] : null;

      // Category map loaded but slug not found
      if (
        normalized !== "all" &&
        normalized &&
        !catId &&
        Object.keys(catIdMap).length > 0
      ) {
        setLoading(false);
        setLoadingMore(false);
        setHasLoadedOnce(true);
        setHasMore(false);
        return () => ctrl.abort();
      }

      const params = new URLSearchParams({
        _embed: 1,
        per_page: POSTS_PER_BATCH,
        page: pageNum,
        ...(catId && { categories: catId }),
        ...(search && { search }),
      });

      const key = params.toString();
      const cached = postsCache.get(key);
      if (cached && Date.now() < cached.expiresAt) {
        if (append) setPosts((p) => [...p, ...cached.data]);
        else setPosts(cached.data);
        setHasMore(pageNum < cached.totalPages);
        setLoading(false);
        setLoadingMore(false);
        setHasLoadedOnce(true);
        return () => ctrl.abort();
      }

      fetch(`${WP_BASE}/posts?${params}`, { signal: ctrl.signal })
        .then((res) => {
          const tp = parseInt(res.headers.get("X-WP-TotalPages") || "1", 10);
          if (!res.ok) throw new Error("Could not load posts");
          return res.json().then((data) => ({ data, tp }));
        })
        .then(({ data, tp }) => {
          if (append) setPosts((p) => [...p, ...data]);
          else setPosts(data);
          setHasMore(pageNum < tp);
          postsCache.set(key, {
            data,
            totalPages: tp,
            expiresAt: Date.now() + CACHE_TTL_MS,
          });
        })
        .catch((err) => {
          if (err.name !== "AbortError") setError(err.message);
        })
        .finally(() => {
          setLoading(false);
          setLoadingMore(false);
          setHasLoadedOnce(true);
        });

      return () => ctrl.abort();
    },
    [categorySlug, search, catIdMap],
  );

  // Initial fetch (wait for catIdMap if needed)
  useEffect(() => {
    if (Object.keys(catIdMap).length === 0 && !catIdMapCache) return;
    setLoading(true);
    return fetchPage(1, false);
  }, [fetchPage, catIdMap]);

  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    setPage((p) => {
      fetchPage(p + 1, true);
      return p + 1;
    });
  }, [loadingMore, hasMore, fetchPage]);

  return {
    posts,
    loading,
    loadingMore,
    hasLoadedOnce,
    error,
    hasMore,
    loadMore,
  };
}

// ─── FEATURED HERO ─────────────────────────────────────────────
function FeaturedPost({ post, onOpen }) {
  if (!post) return null;
  const image = getImage(post);
  return (
    <div
      onClick={() => onOpen(post)}
      className={`group flex flex-col ${image ? "md:flex-row md:h-[380px]" : ""} rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer bg-white mb-10`}
    >
      {image && (
        <div className="relative min-h-[260px] md:min-h-0 md:h-full md:w-1/2 overflow-hidden bg-gray-100">
          <img
            src={image}
            alt=""
            loading="eager"
            width={800}
            height={380}
            onError={(e) => {
              e.currentTarget.parentElement.style.display = "none";
            }}
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

// ─── MEDIUM-STYLE POST ROW ─────────────────────────────────────
function PostRow({ post, onOpen }) {
  const image = getImage(post);
  return (
    <article
      onClick={() => onOpen(post)}
      className="group py-5 sm:py-6 border-b border-gray-100 cursor-pointer hover:bg-gray-50/50 -mx-3 px-3 rounded-xl transition-colors duration-150"
    >
      <div className="flex gap-3 sm:gap-6">
        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <div className="w-5 h-5 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
              <img
                src={AUTHOR.avatar}
                alt=""
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <span className="text-xs text-gray-500 font-medium font-sans">
              {getAuthor(post)}
            </span>
          </div>

          <div className="sm:hidden">
            <div className="grid grid-cols-[minmax(0,1fr)_4rem] gap-x-3 gap-y-2 items-start">
              <h3
                className="min-w-0 text-[1.02rem] font-bold leading-[1.15] tracking-tight text-gray-900 group-hover:text-gray-700 transition-colors max-h-[3.65rem] overflow-hidden"
                dangerouslySetInnerHTML={{ __html: post.title?.rendered }}
              />

              {image && (
                <div className="relative row-span-2 h-16 w-16 rounded-sm overflow-hidden bg-gray-100">
                  <img
                    src={image}
                    alt=""
                    loading="lazy"
                    width={64}
                    height={64}
                    className="absolute inset-0 block !w-full !h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.parentElement.style.display = "none";
                    }}
                  />
                </div>
              )}

              <p className="text-[0.92rem] leading-[1.35] text-gray-500 max-h-[2.7rem] overflow-hidden">
                {getExcerpt(post)}
              </p>
            </div>

            <div className="mt-3">
              <span className="text-xs text-gray-400 font-sans">
                {formatDate(post.date)}
              </span>
            </div>
          </div>

          <div className="hidden sm:block">
            <h3
              className="text-[1.05rem] font-bold leading-snug tracking-tight text-gray-900 mb-1 group-hover:text-gray-700 transition-colors"
              dangerouslySetInnerHTML={{ __html: post.title?.rendered }}
            />
            <p className="text-gray-500 text-sm leading-relaxed max-h-[3rem] overflow-hidden mb-3">
              {getExcerpt(post)}
            </p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {getCategory(post) && (
                <span className="text-[10px] font-bold uppercase tracking-widest bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full font-sans">
                  {getCategory(post)}
                </span>
              )}
              <span className="text-xs text-gray-400 font-sans">
                {timeAgo(post.date)}
              </span>
            </div>
          </div>
        </div>

        {/* Thumbnail desktop */}
        {image && (
          <div className="relative hidden sm:block flex-shrink-0 w-28 h-20 rounded-md overflow-hidden bg-gray-100">
            <img
              src={image}
              alt=""
              loading="lazy"
              width={112}
              height={80}
              className="absolute inset-0 block !w-full !h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.parentElement.style.display = "none";
              }}
            />
          </div>
        )}
      </div>
    </article>
  );
}

// ─── SKELETON ROW ──────────────────────────────────────────────
function SkeletonRow() {
  return (
    <div className="flex gap-6 py-6 border-b border-gray-100 animate-pulse">
      <div className="flex-1 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-gray-100" />
          <div className="h-2.5 bg-gray-100 rounded w-24" />
        </div>
        <div className="h-4 bg-gray-100 rounded w-4/5" />
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-2/3" />
        <div className="flex gap-2 mt-1">
          <div className="h-5 w-16 bg-gray-100 rounded-full" />
          <div className="h-5 w-10 bg-gray-100 rounded-full" />
        </div>
      </div>
      <div className="flex-shrink-0 w-28 h-20 rounded-md bg-gray-100" />
    </div>
  );
}

// ─── AUTHOR SIDEBAR ────────────────────────────────────────────
function AuthorSidebar({ activeCategory, onCategoryChange }) {
  return (
    <aside className="hidden lg:block w-[280px] xl:w-[300px] flex-shrink-0">
      <div className="sticky top-24 space-y-7">
        {/* Author profile */}
        <div>
          <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mb-3">
            <img
              src={AUTHOR.avatar}
              alt={AUTHOR.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
          <h2 className="text-sm font-bold text-gray-900 mb-1">
            {AUTHOR.name}
          </h2>
          <p className="text-xs text-gray-500 leading-relaxed mb-2 font-sans">
            {AUTHOR.bio}
          </p>
          {/* <p className="text-xs text-gray-400 font-sans mb-3">
            <span className="font-semibold text-gray-700">
              {AUTHOR.followers}
            </span>{" "}
            followers
          </p> */}
          <a
            href={AUTHOR.wpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-gray-800 text-gray-800 text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full hover:bg-gray-900 hover:text-white transition-colors"
          >
            Go To Medium
          </a>
        </div>

        <hr className="border-gray-100" />

        {/* Topic nav */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2 font-sans">
            Browse by topic
          </p>
          <nav className="flex flex-col gap-0.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`text-left text-sm font-sans px-3 py-2 rounded-lg transition-colors ${
                  activeCategory === cat.id
                    ? "bg-gray-900 text-white font-semibold"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </nav>
        </div>

        <hr className="border-gray-100" />

        
      </div>
    </aside>
  );
}

// ─── ARTICLE MODAL ─────────────────────────────────────────────
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
        >
          <span className="text-lg leading-none md:hidden">×</span>
          <span className="hidden md:inline">←</span>
          <span className="hidden md:inline text-sm font-semibold">
            Back to Blogs
          </span>
        </button>
        <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-20 pb-12 md:pt-14 md:pb-14">
          <h1
            className="text-[2.2rem] md:text-6xl font-extrabold tracking-tight leading-[1.08] text-gray-900 mb-5 md:mb-8"
            dangerouslySetInnerHTML={{ __html: post.title?.rendered }}
          />
          <div className="flex flex-wrap gap-2 items-center text-xs text-gray-400 tracking-wide mb-8">
            {getCategory(post) && (
              <span className="bg-gray-900 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                {getCategory(post)}
              </span>
            )}
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{readTime(post.content?.rendered || "")}</span>
            <span>·</span>
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

// ─── NEWSLETTER ────────────────────────────────────────────────
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
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Subscription failed");
      setSubmitted(true);
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <div className="bg-gray-900 text-white rounded-2xl px-6 py-12 text-center my-10">
      <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">
        Stay Updated
      </p>
      <h3 className="text-xl font-bold tracking-tight mb-1">
        New posts in your inbox
      </h3>
      <p className="text-gray-400 text-sm mb-6">
        No spam. Unsubscribe any time.
      </p>
      {submitted ? (
        <p className="text-green-400 font-semibold">
          ✓ You're subscribed — thank you!
        </p>
      ) : (
        <>
          <div className="flex flex-wrap justify-center items-center gap-2 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              className="flex-1 min-w-[180px] px-4 py-2.5 rounded-full text-gray-900 text-sm outline-none"
            />
            <button
              onClick={submit}
              className="bg-white text-gray-900 text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-full hover:bg-gray-100 transition-colors"
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

// ─── MAIN PAGE ─────────────────────────────────────────────────
export function Blog() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [openPost, setOpenPost] = useState(null);

  const {
    posts,
    loading,
    loadingMore,
    hasLoadedOnce,
    error,
    hasMore,
    loadMore,
  } = usePosts({
    categorySlug: activeCategory,
    search: searchQuery,
  });

  const latestPost =
    activeCategory === "all" && !searchQuery ? (posts[0] ?? null) : null;
  const postsToShow = latestPost ? posts.slice(1) : posts;

  // Infinite scroll sentinel
  const sentinelRef = useRef(null);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loadingMore) loadMore();
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasMore, loadingMore, loadMore]);

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

  const handleOpenPost = async (post) => {
    if (post?.content?.rendered) {
      setOpenPost(post);
      return;
    }
    try {
      const res = await fetch(`${WP_BASE}/posts/${post.id}?_embed=1`);
      setOpenPost(res.ok ? await res.json() : post);
    } catch {
      setOpenPost(post);
    }
  };

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <main className="max-w-[1192px] mx-auto px-4 sm:px-8 lg:px-16 font-serif text-gray-900">
        {/* Page title + search */}
        <section className="text-center pt-16 md:pt-26 pb-10 max-w-[680px] mx-auto">
          <p className="text-[10px] uppercase tracking-[0.22em] text-gray-400 font-semibold mb-3">
            The Creative Room
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-none mb-4">
            Blog
          </h1>
          <p className="text-gray-400 text-sm max-w-sm mx-auto mb-7 font-sans leading-relaxed">
            Stories on parenting, creativity &amp; the soul of everyday life
          </p>
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
                onClick={() => {
                  setSearchInput("");
                  setSearchQuery("");
                }}
                className="text-gray-300 hover:text-gray-500 transition-colors font-sans text-base px-2 leading-none"
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

        {/* Featured hero */}
        {!loading && latestPost && (
          <div className="max-w-[850px] mx-auto">
            <FeaturedPost post={latestPost} onOpen={handleOpenPost} />
          </div>
        )}

        {/* Two-column layout — Medium style: centered content + right sidebar */}
        <div className="flex gap-16 xl:gap-24 justify-center">
          {/* LEFT — tabs + scrollable list */}
          <div className="w-full max-w-[680px] min-w-0">
            {/* Medium-style tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
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
            </div>

            {/* First load skeleton */}
            {!hasLoadedOnce && loading && (
              <div>
                {[...Array(5)].map((_, i) => (
                  <SkeletonRow key={i} />
                ))}
              </div>
            )}

            {/* Error */}
            {error && !loading && (
              <div className="text-center py-16 text-gray-500">
                <p className="text-3xl mb-2">⚠️</p>
                <p className="font-bold mb-1">Couldn't load posts</p>
                <p className="text-sm text-gray-400">{error}</p>
              </div>
            )}

            {/* Empty */}
            {hasLoadedOnce &&
              !loading &&
              !error &&
              postsToShow.length === 0 &&
              !latestPost && (
                <div className="text-center py-16 text-gray-500">
                  <p className="text-3xl mb-2">📭</p>
                  <p className="font-bold mb-1">No posts found</p>
                  <p className="text-sm text-gray-400">
                    {searchQuery
                      ? `No results for "${searchQuery}"`
                      : "This category has no posts yet."}
                  </p>
                </div>
              )}

            {/* Post rows */}
            {postsToShow.map((post) => (
              <PostRow key={post.id} post={post} onOpen={handleOpenPost} />
            ))}

            {/* Loading more */}
            {loadingMore && (
              <div className="flex justify-center py-8">
                <div className="w-6 h-6 rounded-full border-2 border-gray-200 border-t-gray-700 animate-spin" />
              </div>
            )}

            {/* Infinite scroll sentinel */}
            <div ref={sentinelRef} className="h-4" />

            {/* End message */}
            {hasLoadedOnce && !hasMore && postsToShow.length > 0 && (
              <p className="text-center text-xs text-gray-300 font-sans py-8">
                You've read everything · {posts.length} posts total
              </p>
            )}

            <Newsletter />
          </div>

          {/* RIGHT — sticky sidebar */}
          <AuthorSidebar
            activeCategory={activeCategory}
            onCategoryChange={handleCategory}
          />
        </div>
      </main>

      {openPost && (
        <ArticleModal post={openPost} onClose={() => setOpenPost(null)} />
      )}
    </>
  );
}
