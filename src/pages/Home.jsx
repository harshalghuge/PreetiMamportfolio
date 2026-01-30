import React from "react";
import "../styles/global.css"; // Import global.css

 const Home = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* Background Image - Using Unsplash for high-quality black & white texture */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url("images/IMG5.JPEG")`,
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Gradient Overlay for depth */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/30"></div> */}
      </div>

      {/* Content Container */}
        <div className="">
        <div className="mt-16  text-center">
          <div className="relative z-10 w-full">
            <div className="mx-auto max-w-6xl">
              <div className="max-w-4xl">
                {/* Subtitle */}
                <p className=" max-w-[80%] mx-auto text-white/80 font-sans text-[16px] sm:text-[18px]  lg:tracking-[0.1em] font-medium uppercase mb-4">
                  READY TO FALL IN LOVE WITH LIFE AGAIN?
                </p>

                {/* Heading */}
                <div className="main-qoute font-serif font-light md:w-[70%] md:mx-auto md:text-center">
                  <h1 className="text-white/90 font-light text-5xl leading-[1.2em] uppercase">
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
                <div className="mx-auto w-[90%] sm:w-[80%] md:max-w-[65%] text-center">
                  <p
                    className="mt-6 text-white/70 text-[18px] sm:text-[18px] md:text-[18px]
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
                  className="px-6 py-2 sm:px-8 sm:py-3 rounded-full border-2 border-white/70 text-white/70 
                              text-[14px] sm:text-[15px] tracking-[0.12em] uppercase italic font-medium
                              hover:bg-white hover:text-black transition-all duration-300"
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
  );
};
export default Home;
