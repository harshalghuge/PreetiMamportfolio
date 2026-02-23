import { useEffect, useState, useRef } from "react";
import JourneySection from "./JourneySection";

const MainSection = () => {
  const [isVisible, setIsVisible] = useState({
    title: false,
    paragraph1: false,
    divider: false,
    paragraph2: false,
    button: false,
  });

  const titleRef = useRef(null);
  const para1Ref = useRef(null);
  const dividerRef = useRef(null);
  const para2Ref = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px",
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;

          if (target === titleRef.current) {
            setTimeout(
              () => setIsVisible((prev) => ({ ...prev, title: true })),
              0,
            );
          } else if (target === para1Ref.current) {
            setTimeout(
              () => setIsVisible((prev) => ({ ...prev, paragraph1: true })),
              50,
            );
          } else if (target === dividerRef.current) {
            setTimeout(
              () => setIsVisible((prev) => ({ ...prev, divider: true })),
              100,
            );
          } else if (target === para2Ref.current) {
            setTimeout(
              () => setIsVisible((prev) => ({ ...prev, paragraph2: true })),
              150,
            );
          } else if (target === buttonRef.current) {
            setTimeout(
              () => setIsVisible((prev) => ({ ...prev, button: true })),
              200,
            );
          }

          observer.unobserve(target);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    if (titleRef.current) observer.observe(titleRef.current);
    if (para1Ref.current) observer.observe(para1Ref.current);
    if (dividerRef.current) observer.observe(dividerRef.current);
    if (para2Ref.current) observer.observe(para2Ref.current);
    if (buttonRef.current) observer.observe(buttonRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ================= TOP SECTION ================= */}
      <section className="relative w-full bg-gradient-to-b from-[#F7F4EE] via-[#FAF8F3] to-white py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Label */}
          <div
            ref={titleRef}
            className={`flex items-center justify-center lg:justify-start gap-3 mb-10 md:mb-0 transition-all duration-700 ${
              isVisible.title
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="w-12 h-[1px] hidden md:block bg-[#8B7355]" />
            <span className="text-sm tracking-[0.3em] text-[#8B7355] font-light uppercase">
              About
            </span>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Text Content */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <h2
                ref={para1Ref}
                className={`text-4xl md:text-5xl lg:text-6xl font-serif text-[#1D1A13] leading-[1.1] transition-all duration-700 delay-100 ${
                  isVisible.paragraph1
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                Meet Preeti
              </h2>

              <div className="space-y-6">
                <p
                  ref={dividerRef}
                  className={`text-lg md:text-xl leading-relaxed text-[#2D2A1F]/80 transition-all duration-700 delay-200 ${
                    isVisible.divider
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  I spent years searching for something I couldn't name. A
                  feeling of being at home in my own life. A sense that I was
                  living, not just performing.
                </p>

                <p
                  ref={para2Ref}
                  className={`text-lg md:text-xl leading-relaxed text-[#2D2A1F]/80 transition-all duration-700 delay-300 ${
                    isVisible.paragraph2
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  The answer wasn't in achievement or success. It was in the
                  education no one ever gave us: how to understand ourselves.
                </p>

                <p className="text-lg md:text-xl leading-relaxed text-[#2D2A1F] font-medium italic">
                  That became my life's work.
                </p>
              </div>
            </div>

            {/* Image Content */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <div className="w-full max-w-[360px] md:max-w-[420px]">
                <div className="relative">
                  {/* Accent Border */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-[#8B7355]/10 to-transparent rounded-2xl" />

                  {/* Image Container */}
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
                    <img
                      src="/images/IMG16.jpeg"
                      alt="Preeti"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Decorative Element */}
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#8B7355]/5 rounded-full blur-2xl -z-10" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Fade Transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white pointer-events-none" />
      </section>

      {/* ================= BOTTOM SECTION ================= */}
      <section className="w-full bg-[#F7F4EE]">
        <div className="grid ">
          {/* Journey Section */}
          <div className="flex flex-col items-center justify-center py-10">
            <JourneySection />
          </div>
        </div>
      </section>
    </>
  );
};

export default MainSection;
