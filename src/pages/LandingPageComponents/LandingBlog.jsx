import React from "react";

const BlogCard = ({ image, title, height }) => {
  return (
    <article className="flex flex-col gap-4">
      <div className={`overflow-hidden ${height}`}>
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="italic text-xl">{title}</h3>

      <a
        href="/blog"
        className="text-xs tracking-widest uppercase border-b border-black w-fit"
      >
        Read More
      </a>
    </article>
  );
};

const LandingBlog = () => {
  return (
    <section className="bg-[#a9a792] py-40">
      <div className="max-w-6xl mx-auto px-8">
        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">

          {/* LEFT COLUMN */}
          <div className="flex flex-col items-center gap-24 text-center lg:text-left lg:items-start">
            
            {/* Heading */}
            <div className="max-w-sm">
              <h2 className="text-4xl font-serif mb-4">ON THE BLOG</h2>
              <p className="text-sm leading-relaxed">
                Thirdeye colloidal silver fertility awareness divine feminine,
                apple cider vinegar bentonite clay aura rolfing discovering
                valuable truths.
              </p>
            </div>

            {/* BIG BLOG */}
            <BlogCard
              image="https://images.squarespace-cdn.com/content/v1/6533c4b5460fb876e598d099/da0e5c22-4c8d-455a-86d0-dda8a8309466/richard-jaimes-wi5E7IFDMwY-unsplash.png"
              title="Blog Post Title One"
              height="h-[560px]"
            />
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-32">
            <BlogCard
              image="https://images.squarespace-cdn.com/content/v1/6533c4b5460fb876e598d099/432c6929-b209-405a-a3b1-0a756dcce4bd/pexels-roman-ska-7096339.png"
              title="Blog Post Title Two"
              height="h-[360px]"
            />

            <BlogCard
              image="https://images.squarespace-cdn.com/content/v1/6533c4b5460fb876e598d099/1697891510217-4OZ4LNUIL8B5IRMFSLXZ/b05d4534f87429c08beee64f01ae0a37.png"
              title="Blog Post Title Three"
              height="h-[360px]"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default LandingBlog;
    