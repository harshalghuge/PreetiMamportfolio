import { useEffect, useState, useRef } from "react";
import AnimatedImageCard from "../../components/AnimatedImageCard";
import JourneySection from "./JourneySection";
import ProfileCard from "./ProfileCard";

const MainSection = () => {
  const [offset, setOffset] = useState(0);
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
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? "down" : "up";
      lastScrollY = currentScrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setOffset((prev) => {
            const step = 1.1;
            if (direction === "up") return Math.min(prev + step, 60);
            return Math.max(prev - step, 0);
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -100px 0px",
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
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* IMAGE */}
          <div className="relative h-[350px] md:h-[640px] overflow-hidden order-1 md:order-2 fade-up">
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
                className={`mt-8 text-base lg:text-lg leading-relaxed text-[#2D2A1F] indent-8 font-light transition-all duration-500 ${
                  isVisible.paragraph1
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{
                  textAlign: "justify",
                  hyphens: "auto",
                }}
              >
                I spent years searching for something I couldn't name—a sense of
                being at home in my own life. School, success, and pleasing
                others never gave it to me. I learned the hard way that the most
                important education is never taught: understanding ourselves—how
                to feel, how to listen to our inner world, how to be with who we
                are. Through lived experience, I discovered that I am not what
                happened to me, but what I choose to become.
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
                className={`text-base lg:text-lg leading-relaxed text-[#2D2A1F] indent-8 font-light transition-all duration-500 ${
                  isVisible.paragraph2
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{
                  textAlign: "justify",
                  hyphens: "auto",
                }}
              >
                Today, this missing education is my life's work. I support
                children in developing the emotional skills they deserve, create
                experiential spaces for adults ready to go deeper, and build
                accessible communities where every voice can be heard. Growth
                doesn't begin with strategy—it begins with self-understanding.
                If this resonates, trust that.
              </p>

              {/* Button */}
              <button
                ref={buttonRef}
                className={`mt-8 px-8 py-1 border-2 border-[#2D2A1F] rounded-full text-sm tracking-[0.2em] font-medium
                transition-all duration-500 
                hover:bg-[#2D2A1F] hover:text-white hover:shadow-lg hover:scale-105
                active:scale-95
                ${
                  isVisible.button
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-90"
                }`}
              >
                LEARN MORE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BOTTOM SECTION ================= */}
      <section className="w-full bg-[#F7F4EE]">
        <div className="grid">
          {/* IMAGE */}
          {/* <div className="relative h-[490px] md:h-[680px]">
            <AnimatedImageCard
              image={
                "https://riselovelive.com/wp-content/uploads/2020/02/and-my-journey-begins_pin-683x1024.png"
              }
            />
          </div> */}

          {/* TEXT */}
          <div className="flex flex-col justify-center items-center  py-2  fade-up">
            {/* ====================================old version==================================== */}
            {/* <h2 className="text-3xl font-serif text-[#1D1A13] tracking-wide">
              MEET MINERVA
            </h2>

            <p className="mt-5 text-[18px] leading-5 text-[#2D2A1F] max-w-[520px]">
              Tapping into the blue whale shark turtle energy, tripplethra channel
              typography coldlaid silver fertility awareness divine feminine.
            </p>

            <p className="mt-4 text-[18px] leading-5 text-[#2D2A1F] max-w-[520px]">
              Universal talking stick wisdom of your body, healer nonprofit
              retreat kale chips kombucha beth change programming your DNA.
            </p>

            <button className="mt-6 w-fit border border-[#2D2A1F] px-6 py-2 rounded-full text-[12px] tracking-widest hover:bg-black hover:text-white transition-all">
              LEARN MORE
            </button> */}

            {/* ====================================journey section==================================== */}
            <JourneySection />
          </div>
        </div>
      </section>
    </>
  );
};

export default MainSection;
