import React, { useRef } from "react";
import "../styles/global.css"; // Import global.css
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const desktopBgY = useTransform(scrollYProgress, [0, 1], ["45%", "85%"]);

  return (
    <>
    <section ref={heroRef} className="relative w-full min-h-screen flex items-center overflow-hidden ">

      <motion.div
        style={{
          backgroundPositionY: desktopBgY,
          backgroundImage: `url("/images/IMG5.JPEG")`,
          filter: "grayscale(100%) contrast(110%) brightness(72%)",
        }}
        className="absolute inset-0 bg-cover bg-center bg-fixed hidden md:block will-change-[background-position]"
      />

      {/* Mobile background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed block md:hidden"
        style={{
          backgroundImage: `url("/images/mobilebg1.JPEG")`,
          filter: "grayscale(100%) contrast(108%) brightness(70%)",
        }}
      />

      {/* Neutral grey overlay
      <div className="absolute inset-0 bg-stone-500/10"></div> */}

      {/* Content Container */}
      <div className="">
        <div className="mt-24  text-center">
          <div className="relative z-10 w-full">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-5xl">
                {/* Subtitle */}
                <p className="max-w-[85%] mx-auto text-white/80 font-sans text-[15px] sm:text-[17px] md:text-[18px] lg:tracking-[0.1em] font-medium uppercase mb-4">
                  READY TO FALL IN LOVE WITH LIFE AGAIN?
                </p>

                {/* Heading */}
                <div className="main-qoute font-serif font-light md:w-[78%] md:mx-auto md:text-center px-2">
                  <h1 className="text-white/90 font-light text-5xl sm:text-6xl lg:text-7xl leading-[1.12em] uppercase">
                    <span className="block font-span tracking-[-0.01em] ">
                      When did you stop
                    </span>

                    <span className="block tracking-[-0.01em]">
                      knowing who you are?
                    </span>

                    {/* to add anything new just add new span with content for next line */}
                  </h1>
                </div>

                {/* Description */}
                <div className="mx-auto w-[90%] sm:w-[84%] md:max-w-[66%] text-center">
                  <p
                    className="mt-6 text-white/70 text-[17px] sm:text-[18px] md:text-[19px]
                  font-sans font-medium mx-auto
                  text-center md:text-center-last md:text-center"
                  >
                    Maybe it was gradual, role by role, responsibility by
                    responsibility. Maybe it was sudden, a loss that cracked
                    everything open. Either way, you're here. And that matters.
                  </p>
                </div>

                {/* Button */}
                <div className="mt-8 flex justify-center">
                  <button
                    className="px-7 py-2.5 sm:px-9 sm:py-3.5 rounded-full border-2 border-white/70 text-white/70 
                              text-[14px] sm:text-[15px] tracking-[0.12em] uppercase italic font-medium
                              hover:bg-white hover:text-black transition-all duration-300"
                    onClick={()=> navigate("/about")}
                    >
                    About Me
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};
export default Home;
