import React from "react";

const offerings = [
  {
    audience: "For Parents",
    title: "The Missing Education Workshop",
    description:
      "A 4-week live program teaching parents how to raise emotionally intelligent children through practical emotional literacy tools.",
    meta: "Online | 4 Weeks | Cohort-Based",
  },
  {
    audience: "For Communities",
    title: "Listening Circles / Spaces",
    description:
      "A 90-minute guided experience in the art of being truly heard, creating room for authentic connection and emotional release.",
    meta: "In-person | 90 Minutes | Monthly",
  },
  {
    audience: "For Seekers",
    title: "SoulTales Retreats",
    description:
      "Immersive residential experiences blending shadow work, person-centered presence, and somatic practices in carefully held spaces.",
    meta: "Residential | Multi-day | Limited Spots",
  },
  {
    audience: "For Organisations",
    title: "Corporate Workshops",
    description:
      "Bring emotional intelligence and human skills to your teams through practical sessions on self-awareness, listening, and leadership.",
    meta: "In-person or Virtual | Customised",
  },
];

const WorkWithMeSection = () => {
  return (
    <section className="w-full bg-[#F2EFE8] py-20 md:py-28 border-y border-[#dbd4c8]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid place-items-center">
          <header className="max-w-3xl mx-auto mb-12 md:mb-16  ">
            <h2 className=" text-center font-serif text-4xl md:text-5xl text-[#2a2720] mb-5">
              Work With Me
            </h2>
            <p className="text-center text-[#666057] text-base md:text-lg leading-relaxed mb-8">
              Whether you're seeking transformation for yourself, your children,
              or your organization, here's how we can begin.
            </p>
          </header>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {offerings.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-[#d4ccbf] bg-white/55 backdrop-blur-sm p-7 md:p-8 shadow-[0_10px_30px_rgba(49,38,27,0.06)]"
            >
              <span className="inline-block mb-5 px-4 py-2 rounded-full bg-[#7f907f] text-white text-[11px] font-semibold tracking-wide uppercase">
                {item.audience}
              </span>

              <h3 className="font-serif text-2xl text-[#2f2b24] mb-4">
                {item.title}
              </h3>

              <p className="text-[#6a645d] leading-relaxed text-base mb-7">
                {item.description}
              </p>

              <div className="h-px w-full bg-[#d6cec1] mb-5" />

              <p className="text-sm text-[#bd7d59] tracking-wide">
                {item.meta}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkWithMeSection;
