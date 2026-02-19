import React, { useEffect, useState } from "react";
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

const getExcerpt = (post, max = 110) => {
  const text = stripHtml(post?.excerpt?.rendered || post?.content?.rendered || "");
  return text.length > max ? `${text.slice(0, max)}...` : text;
};

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const getCategory = (post) => post?._embedded?.["wp:term"]?.[0]?.[0]?.name || "Journal";

const FeaturedCard = ({ post }) => {
  if (!post) return null;

  return (
    <article className="group relative w-full h-full">
      <div className="relative overflow-hidden w-full h-[320px] md:h-[380px] lg:h-[430px]">
        <img
          src={getImage(post)}
          alt={stripHtml(post.title?.rendered || "Blog image")}
          loading="lazy"
          className="w-full h-full object-cover block transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
      </div>

      <div className="mt-5">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-sans text-[10px] uppercase tracking-[0.18em] text-[#2D2A1F]/70">
            {getCategory(post)}
          </span>
          <span className="w-1 h-1 rounded-full bg-[#2D2A1F]/35" />
          <p className="font-sans text-[11px] text-[#2D2A1F]/70">
            {formatDate(post?.date)}
          </p>
        </div>
        <h3
          className="text-[34px] md:text-[42px] font-serif text-[#1D1A13] leading-[1.04] tracking-[-0.01em]"
          dangerouslySetInnerHTML={{ __html: post.title?.rendered }}
        />
        <p className="font-sans text-[15px] leading-relaxed text-[#2D2A1F]/85 mt-4 max-w-xl">
          {getExcerpt(post, 360)}
        </p>
        <p className="font-sans text-[11px] tracking-[0.2em] uppercase mt-5 text-[#2D2A1F]">
          Read More
        </p>
      </div>

      <Link to="/blog" className="absolute inset-0" aria-label="Read post" />
    </article>
  );
};

const SideCard = ({ post }) => {
  if (!post) return null;

  return (
    <article className="group relative w-full h-full">
      <div className="relative overflow-hidden w-full h-[170px] md:h-[185px] lg:h-[130px]">
        <img
          src={getImage(post)}
          alt={stripHtml(post.title?.rendered || "Blog image")}
          loading="lazy"
          className="w-full h-full object-cover block transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
      </div>

      <div className="mt-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="font-sans text-[10px] uppercase tracking-[0.18em] text-[#2D2A1F]/70">
            {getCategory(post)}
          </span>
          <span className="w-1 h-1 rounded-full bg-[#2D2A1F]/35" />
          <p className="font-sans text-[11px] text-[#2D2A1F]/70">
            {formatDate(post?.date)}
          </p>
        </div>
        <h3
          className="text-[26px] md:text-[29px] font-serif text-[#1D1A13] leading-[1.06] tracking-[-0.01em]"
          dangerouslySetInnerHTML={{ __html: post.title?.rendered }}
        />
        <p className="font-sans text-[14px] leading-relaxed text-[#2D2A1F]/80 mt-3">
          {getExcerpt(post, 85)}
        </p>
        <p className="font-sans text-[11px] tracking-[0.2em] uppercase mt-4 text-[#2D2A1F]">
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
    <section className="relative bg-[#a9a792] py-16 md:py-20 lg:py-24 overflow-hidden">
      <style>{`
        @keyframes landingBlogFadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div
          className="mb-10 md:mb-12 opacity-0 animate-[landingBlogFadeUp_0.7s_ease_forwards]"
          style={{ animationDelay: "80ms" }}
        >
          <div className="max-w-2xl">
            <p className="font-sans text-[11px] tracking-[0.24em] uppercase text-[#2D2A1F]/70 mb-3">
              On The Blog
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#1D1A13] mb-3 tracking-[-0.01em]">
              Latest From The Blog
            </h2>
            <p className="font-sans text-sm md:text-base text-[#2D2A1F]/80">
              One featured story and two more recent posts.
            </p>
          </div>
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 lg:items-stretch opacity-0 animate-[landingBlogFadeUp_0.7s_ease_forwards]"
          style={{ animationDelay: "180ms" }}
        >
          <FeaturedCard post={posts[0]} />
          <div className="flex flex-col gap-6 h-full w-full lg:max-w-[420px] xl:max-w-[450px] lg:ml-auto">
            <SideCard post={posts[1]} />
            <SideCard post={posts[2]} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingBlog;
