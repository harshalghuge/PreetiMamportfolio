import { useEffect, useState, useRef } from "react";
import ProfileCard from "./ProfileCard";
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
              50,
            );
          } else if (target === para1Ref.current) {
            setTimeout(
              () => setIsVisible((prev) => ({ ...prev, paragraph1: true })),
              150,
            );
          } else if (target === dividerRef.current) {
            setTimeout(
              () => setIsVisible((prev) => ({ ...prev, divider: true })),
              250,
            );
          } else if (target === para2Ref.current) {
            setTimeout(
              () => setIsVisible((prev) => ({ ...prev, paragraph2: true })),
              350,
            );
          } else if (target === buttonRef.current) {
            setTimeout(
              () => setIsVisible((prev) => ({ ...prev, button: true })),
              450,
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
      <section className="w-full bg-[#F7F4EE]  ">
        <div className="grid grid-cols-1 md:grid-cols-2 ">
          {/* IMAGE */}
          <div className="relative hidden md:block  order-1 h-[350px] overflow-hidden md:order-2 md:h-[640px]">
            <ProfileCard />
          </div>

          {/* TEXT */}
          <div className="flex items-center justify-center px-6 py-12 md:p-16 order-2 md:order-1 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-[#8B7355] opacity-5 blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-[#8B7355] opacity-5 blur-3xl pointer-events-none" />

            <div className="flex flex-col justify-center items-center max-w-2xl mx-auto z-10">
              {/* Title with elegant reveal animation */}
              <div
                ref={titleRef}
                className={`relative overflow-hidden transition-all duration-1000 ${
                  isVisible.title
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <h2 className="text-3xl lg:text-4xl font-serif text-[#1D1A13] tracking-wide mb-2 text-center">
                  MEET PREETI
                </h2>
                <div
                  className={`h-[2px] bg-gradient-to-r from-transparent via-[#8B7355] to-transparent transition-all duration-1000 delay-300 ${
                    isVisible.title ? "w-full opacity-100" : "w-0 opacity-0"
                  }`}
                />
              </div>

              {/* First Paragraph */}
              <p
                ref={para1Ref}
                className={`mt-8 w-full md:w-[90%] text-base lg:text-lg leading-relaxed text-[#2D2A1F]  font-light transition-all duration-500 text-center ${
                  isVisible.paragraph1
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{
                  textAlign:"center",
                  hyphens: "auto",
                }}
              >
                I'm Preeti - and I spent years searching for something I couldn't name. 
                <br />
                A feeling of being at home in my own life. A sense that I was living, not just performing.
              </p>

              {/* Decorative divider */}
              <div
                ref={dividerRef}
                className={`my-6 flex items-center gap-3 transition-all duration-500 ${
                  isVisible.divider
                    ? "opacity-60 scale-100"
                    : "opacity-0 scale-75"
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-[#8B7355]" />
                <div className="w-12 h-[1px] bg-[#8B7355]" />
                <div className="w-2 h-2 rounded-full bg-[#8B7355]" />
              </div>

              {/* Second Paragraph */}
              <p
                ref={para2Ref}
                className={`w-full md:w-[90%] text-base lg:text-lg leading-relaxed text-[#2D2A1F]  font-light transition-all duration-500 text-center ${
                  isVisible.paragraph2
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{
                  textAlign:"center",
                  hyphens: "auto",
                }}
              >
                The answer wasn't in achievement or success. It was in the education no one ever gave us: 
                how to understand ourselves.
                That became my life's work.
              </p>
            </div>
          </div>


          {/* {image shouls be at botom of para for mobile} */}
              <div className="relative block lg:hidden   h-[350px] overflow-hidden p-4 order-3 md:h-[640px]">
                <ProfileCard />
              </div>
        </div>
      </section>

      {/* ================= BOTTOM SECTION ================= */}
      <section className="w-full bg-[#F7F4EE]">
        <div className="grid">
          {/* Journey Section */}
          <div className="flex flex-col items-center justify-center py-2">
            <JourneySection />
          </div>
        </div>
      </section>
    </>
  );
};

export default MainSection;
