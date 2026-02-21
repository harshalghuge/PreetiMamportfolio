import React, { useEffect, useState } from "react";
import he from "he";
import { Link } from "react-router-dom";

const WP_BASE = "https://blog.preetitoraskar.com/wp-json/wp/v2";

const stripHtml = (html = "") => html.replace(/<[^>]*>/g, "");

const getFirstImageFromHtml = (html = "") => {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match?.[1] || null;
};

const getImage = (post) =>
  post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
  getFirstImageFromHtml(post?.content?.rendered || "") ||
  "/images/mobilebg1.JPEG";

const getExcerpt = (post, maxWords = 60) => {
  const text = he.decode(
    stripHtml(post?.excerpt?.rendered || post?.content?.rendered || "")
  );

  const words = text.split(/\s+/);

  return words.length > maxWords
    ? words.slice(0, maxWords).join(" ") + "…"
    : text;
};

const getFeaturedExcerpt = (post, maxWords = 55) => {
  const text = he.decode(stripHtml(post?.content?.rendered || ""));
  const words = text.split(/\s+/).filter(Boolean);

  return words.length > maxWords
    ? words.slice(0, maxWords).join(" ") + "..."
    : text;
};

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const getCategory = (post) => post?._embedded?.["wp:term"]?.[0]?.[0]?.name || "Journal";

const PostDivider = ({ className = "" }) => (
  <div className={`w-full flex items-center justify-center ${className}`}>
    <span className="h-px w-[42%] border-t border-dashed border-[#2D2A1F]/35" />
    <span className="mx-3 h-1.5 w-1.5 rounded-full bg-[#2D2A1F]/45" />
    <span className="h-px w-[42%] border-t border-dashed border-[#2D2A1F]/35" />
  </div>
);

const FeaturedCard = ({ post }) => {
  if (!post) return null;

  return (
    <article className="group relative w-full h-full">
      <div className="relative overflow-hidden w-full aspect-[16/9]">
        <img
          src={getImage(post)}
          alt={stripHtml(post.title?.rendered || "Blog image")}
          loading="lazy"
          className="w-full h-full object-cover block transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
      </div>

      <div className="mt-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-sans text-[9px] uppercase tracking-[0.16em] text-[#2D2A1F]/70">
            {getCategory(post)}
          </span>
          <span className="w-1 h-1 rounded-full bg-[#2D2A1F]/35" />
          <p className="font-sans text-[10px] text-[#2D2A1F]/70">
            {formatDate(post?.date)}
          </p>
        </div>
        <h3
          className="text-[24px] md:text-[30px] font-serif text-[#1D1A13] leading-[1.08] tracking-[-0.01em]"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
          dangerouslySetInnerHTML={{ __html: post.title?.rendered }}
        />
        <p className="font-sans text-[13px] leading-relaxed text-[#2D2A1F]/85 mt-2 max-w-3xl">
          {getFeaturedExcerpt(post, 55)}
        </p>
        <p className="inline-flex items-center font-sans text-[10px] tracking-[0.18em] uppercase mt-3 text-[#2D2A1F] px-3 py-1 rounded-full border border-transparent transition-all duration-300 group-hover:border-[#2D2A1F]/45">
          Read More
        </p>
      </div>

      <Link to="/blog" className="absolute inset-0" aria-label="Read post" />
    </article>
  );
};

const SideCard = ({ post, showExcerpt = true }) => {
  if (!post) return null;

  return (
    <article className="group relative w-full h-full flex flex-col gap-3 mb-2">
      <div className="relative w-full mb-4 aspect-[16/9] overflow-hidden">
        <img
          src={getImage(post)}
          alt={stripHtml(post.title?.rendered || "Blog image")}
          loading="lazy"
          className="w-full h-full object-cover block transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
      </div>

      <div className="mt-1 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-sans text-[8px] uppercase tracking-[0.14em] text-[#2D2A1F]/70">
            {getCategory(post)}
          </span>
          <span className="w-1 h-1 rounded-full bg-[#2D2A1F]/35" />
          <p className="font-sans text-[9px] text-[#2D2A1F]/70">
            {formatDate(post?.date)}
          </p>
        </div>
        <h3
          className="text-[18px] md:text-[20px] font-serif text-[#1D1A13] leading-[1.12] tracking-[-0.01em]"
          dangerouslySetInnerHTML={{ __html: post.title?.rendered }}
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        />
        {showExcerpt && (
          <p className="font-sans text-[11px] leading-relaxed text-[#2D2A1F]/80 mt-1.5">
            {getExcerpt(post, 16)}
          </p>
        )}
        <p className="inline-flex items-center font-sans text-[9px] tracking-[0.16em] uppercase mt-2 text-[#2D2A1F] px-3 py-1 rounded-full border border-transparent transition-all duration-300 group-hover:border-[#2D2A1F]/45">
          Read More
        </p>
      </div>

      <Link to="/blog" className="absolute inset-0" aria-label="Read post" />
    </article>
  );
};

const LandingBlog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${WP_BASE}/posts?_embed=1&per_page=3&page=1`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setPosts(Array.isArray(data) ? data : []))
      .catch(() => setPosts([]));
  }, []);

  return (
    <section className="relative bg-[#a9a792] py-10 md:py-12 lg:py-14 overflow-hidden">
      <style>{`
        @keyframes landingBlogFadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        <div
          className="mb-10 md:mb-8 lg:hidden opacity-0 animate-[landingBlogFadeUp_0.7s_ease_forwards]"
          style={{ animationDelay: "80ms" }}
        >
          <div className="grid place-items-center text-center">
          <div className="max-w-2xl mx-auto text-center">
          
             <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#2D2A1F]/70 mb-2">
              On The Blog
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1D1A13] mb-2 tracking-[-0.01em]">
              Latest From The Blog
            </h2>
            <p className="font-sans text-xs md:text-sm text-[#2D2A1F]/80">
              One featured story and two more recent posts.
            </p>
           
          </div>
          </div>
        </div>

        <div
          className="lg:hidden grid grid-cols-1 gap-10 opacity-0 animate-[landingBlogFadeUp_0.7s_ease_forwards]"
          style={{ animationDelay: "180ms" }}
        >
          <SideCard post={posts[0]} />
          <PostDivider />
          <SideCard post={posts[1]} />
          <PostDivider />
          <SideCard post={posts[2]} />
        </div>

        <div
          className="hidden lg:grid grid-cols-2 gap-4 items-stretch opacity-0 animate-[landingBlogFadeUp_0.7s_ease_forwards]"
          style={{ animationDelay: "180ms" }}
        >
          <div className="flex flex-col h-full">
            <div className="mb-10">
              <div className="max-w-2xl mx-auto text-center">
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#2D2A1F]/70 mb-2">
                  On The Blog
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-[#1D1A13] mb-2 tracking-[-0.01em]">
                  Latest From The Blog
                </h2>
                <p className="font-sans text-xs md:text-sm text-[#2D2A1F]/80">
                  One featured story and two more recent posts.
                </p>
              </div>
            </div>
            <FeaturedCard post={posts[0]} />
          </div>

          <div className="flex flex-col gap-4 h-full w-full max-w-[360px] xl:max-w-[380px] ml-auto">
            <div className="flex-1 min-h-0">
              <SideCard post={posts[1]} showExcerpt={false} />
            </div>
            <PostDivider className="py-1" />
            <div className="flex-1 min-h-0">
              <SideCard post={posts[2]} showExcerpt={false} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingBlog;
