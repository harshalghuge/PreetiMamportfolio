import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const offerings = [
  {
    audience: "For Parents",
    title: "The Missing Education Workshop",
    description:
      "A 4-week live program teaching parents how to raise emotionally intelligent children through practical emotional literacy tools.",
    meta: "Online | 4 Weeks | Cohort-Based",
    image: "/images/youngsoul2.jpeg",
    theme: {
      bg: "#f3e6d8",
      border: "#d7bca1",
      badge: "#a7683f",
      title: "#2f241a",
      text: "#5f4a37",
      meta: "#8e6a4b",
    },
  },
  {
    audience: "For Communities",
    title: "Listening Circles / Spaces",
    description:
      "A 90-minute guided experience in the art of being truly heard, creating room for authentic connection and emotional release.",
    meta: "In-person | 90 Minutes | Monthly",
    image: "/images/IMG8.jpg",
    theme: {
      bg: "#e4eee7",
      border: "#b8ccb9",
      badge: "#4f7e61",
      title: "#1f3326",
      text: "#3f5d47",
      meta: "#5e8168",
    },
  },
  {
    audience: "For Seekers",
    title: "SoulTales Retreats",
    description:
      "Immersive residential experiences blending shadow work, person-centered presence, and somatic practices in carefully held spaces.",
    meta: "Residential | Multi-day | Limited Spots",
    image: "/images/IMG13.jpg",
    theme: {
      bg: "#f0e3e6",
      border: "#d1b8c2",
      badge: "#8f4e64",
      title: "#3a2230",
      text: "#5f4150",
      meta: "#7e5a69",
    },
  },
  {
    audience: "For Organisations",
    title: "Corporate Workshops",
    description:
      "Bring emotional intelligence and human skills to your teams through practical sessions on self-awareness, listening, and leadership.",
    meta: "In-person or Virtual | Customised",
    image: "/images/IMG14.jpg",
    theme: {
      bg: "#e1e8f1",
      border: "#b8c6da",
      badge: "#4d6d97",
      title: "#1e2c3f",
      text: "#405675",
      meta: "#5e789c",
    },
  },
];

const alternatingThemes = [
  {
    bg: "#f4ede4",
    border: "#dfd0bf",
    badge: "#a7744d",
    title: "#312419",
    text: "#61503f",
    meta: "#8d6f55",
  },
  {
    bg: "#e9efea",
    border: "#cad8cd",
    badge: "#5e7f67",
    title: "#223328",
    text: "#46604d",
    meta: "#68826f",
  },
];

const WorkWithMeSection = () => {
  const sectionRefs = useRef([]);

  // FIX 1: Removed useState(false) for isMobile.
  // The problem: useState initialises as false, then setIsMobile(true) fires
  // AFTER the first render inside useEffect. So on mobile, the observer was
  // set up with isMobile=false (wrong), attaching heavy transitions and wrong
  // delay values before the state update could correct things — causing jank.
  // Fix: read matchMedia synchronously in a useRef so the value is correct
  // from the very first render with zero re-renders needed.
  const isMobileRef = useRef(
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 767px)").matches
      : false
  );

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = isMobileRef.current;

    if (prefersReducedMotion || isMobile) {
      sectionRefs.current.forEach((node) => {
        if (!node) return;
        node.classList.add("opacity-100", "translate-y-0");
        node.classList.remove("opacity-0", "translate-y-10");
      });
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          // FIX 2: Use inline styles for the reveal animation instead of
          // toggling Tailwind classes. When both translate-y-0 and translate-y-10
          // exist at the same time (a timing edge case), Tailwind's specificity
          // makes the transition silently break. Inline styles have no conflict.
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";

          // FIX 3: Release will-change after the animation finishes so the
          // browser can free the GPU compositor layer. Keeping will-change
          // permanently on mobile degrades scroll performance for the whole page.
          entry.target.addEventListener(
            "transitionend",
            () => { entry.target.style.willChange = "auto"; },
            { once: true }
          );

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -45px 0px" }
    );

    sectionRefs.current.forEach((node, i) => {
      if (!node) return;
      // FIX 2 (continued): initial hidden state via inline styles (not classes).
      node.style.opacity = "0";
      node.style.transform = "translateY(40px)";
      node.style.transition = "opacity 0.7s ease-out, transform 0.7s ease-out";
      // FIX 1 (continued): transitionDelay now set here where isMobile is
      // guaranteed correct, not in JSX where the stale state value was used.
      node.style.transitionDelay = `${i * 110}ms`;
      node.style.willChange = "opacity, transform";
      observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full overflow-x-clip bg-[#faf4f4]">
      <section className="relative flex h-[320px] items-center justify-center overflow-hidden sm:h-[360px] md:h-[380px]">
        <div className="absolute inset-0 bg-cover bg-center bg-[url('../images/aboutBg_mobile.JPEG')] md:bg-[url('../images/IMG_4276.JPEG')] lg:bg-fixed">
          <div className="absolute inset-0 bg-black/45"></div>
        </div>

        <div className="relative z-10 max-w-4xl px-5 text-center text-white sm:px-6">
          <h1 className="mb-4 font-serif text-4xl font-light leading-tight sm:text-5xl md:mb-6 md:text-6xl lg:text-7xl">
            Work With Me
          </h1>
          <p className="mx-auto max-w-[86rem] text-base font-light leading-relaxed sm:text-lg md:text-2xl">
            Whether you are seeking transformation for yourself, your children, or your organization, here is how we can begin.
          </p>
        </div>
      </section>

      <section className="pb-16 pt-14 sm:pt-16 md:pb-28 md:pt-24">
        <div className="space-y-8 md:space-y-14">
          {offerings.map((item, index) => {
            const imageRight = index % 2 === 0;
            const theme = alternatingThemes[index % 2];

            return (
              <article
                key={item.title}
                ref={(el) => (sectionRefs.current[index] = el)}
                className="mx-auto w-full max-w-7xl px-4 sm:px-5 md:px-8"
                // transitionDelay removed from here — now set in useEffect
                // where isMobile is guaranteed to be the correct value.
              >
                <div
                  className="grid items-stretch overflow-hidden border-y md:min-h-[520px] md:grid-cols-2"
                  style={{ backgroundColor: theme.bg, borderColor: theme.border }}
                >
                  <div
                    className={`relative min-h-[300px] sm:min-h-[340px] md:min-h-[520px] ${imageRight ? "md:order-2" : "md:order-1"}`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      loading={index === 0 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "auto"}
                      decoding={index === 0 ? "sync" : "async"}
                      className="absolute inset-0 block h-full w-full object-cover object-center"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
                  </div>

                  <div className={`flex h-full items-center ${imageRight ? "md:order-1" : "md:order-2"}`}>
                    <div className="w-full px-5 py-8 sm:px-6 md:px-12 md:py-14 lg:px-16">
                      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: theme.badge }}>
                        {item.audience}
                      </p>
                      <h2 className="mb-4 break-words font-serif text-2xl leading-tight sm:text-3xl md:text-5xl" style={{ color: theme.title }}>
                        {item.title}
                      </h2>
                      <p className="mb-6 text-sm leading-relaxed sm:text-base md:mb-7 md:text-lg" style={{ color: theme.text }}>
                        {item.description}
                      </p>
                      <div
                        className="inline-flex items-center pb-1 text-sm uppercase tracking-[0.07em] md:tracking-[0.14em]"
                        style={{ borderColor: theme.meta, color: theme.meta }}
                      >
                        {item.meta}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mx-auto mt-16 max-w-6xl px-5 text-center md:mt-24 md:px-8">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 rounded-full bg-[#a7683f] px-6 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-white shadow-[0_12px_28px_rgba(122,78,47,0.35)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#8f5630] hover:shadow-[0_18px_36px_rgba(122,78,47,0.45)] sm:px-8 sm:py-3.5 sm:text-sm"
          >
            Book Discovery Call
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default WorkWithMeSection;