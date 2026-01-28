import { Button } from "../components/Common";
// import './pages.css'
import { useState, useEffect } from "react";

export const oldhome = () => {
  //      const [scrolled, setScrolled] = useState(false);
  //      const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  //   useEffect(() => {
  //     const handleScroll = () => {
  //       setScrolled(window.scrollY > 50);
  //     };
  //     window.addEventListener('scroll', handleScroll);
  //     return () => window.removeEventListener('scroll', handleScroll);
  //   }, []);

  return (
    // -----------------------------------simple home page code-----------------------------------------------------------------
    // <section id="home" className="hero">
    //   <div className="container">
    //     <div className="hero__content">
    //       <div className="hero__text">
    //         <h1 className="hero__title">Hi, I'm a Developer</h1>
    //         <p className="hero__subtitle">
    //           I create beautiful and functional web experiences that help businesses grow
    //         </p>
    //         <div className="hero__actions">
    //           <Button variant="primary" size="lg">
    //             View My Work
    //           </Button>
    //           <Button variant="outline" size="lg">
    //             Get In Touch
    //           </Button>
    //         </div>
    //       </div>
    //       <div className="hero__image">
    //         <div className="hero__placeholder">Your Image Here</div>
    //       </div>
    //     </div>
    //   </div>
    // </section>

    // ------------------------------------Mouse landing PAge code---------------------------------------------------------

    <section className="relative w-full min-h-screen flex items-center overflow-hidden ">
      {/* Background Image - Using Unsplash for high-quality black & white texture */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2070&auto=format&fit=crop')`,
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Gradient Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/30"></div>
      </div>
  

       

      {/* Content Container */}
      <div className="relative z-10 w-full flex pl-10">
        <div className="mx-auto max-w-7xl px-10 sm:px-8 lg:px-14 py-20 lg:py-28">
          <div className="max-w-3xl animate-fadeInUp">
            {/* Subtitle */}
            <p className="text-white/90 text-xl sm:text-sm tracking-[0.30em] uppercase mb-8 font-light p  -30">
              READY TO FALL IN LOVE WITH LIFE AGAIN?
            </p>

            {/* Heading */}
            <h1 className="text-white font-serif font-light leading-[0.9] ">
              <span className="block text-[30px] sm:text-6xl md:text-7xl lg:text-4xl tracking-tight ">
                LIFE COACHING TO
              </span>
              <span className="block text-[42px] sm:text-6xl md:text-7xl lg:text-4xl tracking-tight">
                CONNECT WITH
              </span>
              <span className="block text-[42px] sm:text-6xl md:text-7xl lg:text-4xl tracking-tight">
                YOUR INNER MUSE
              </span>
            </h1>

            {/* Description */}
            <p className="mt-8 text-white/80 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl font-light">
              Kombucha hooping kirtan superfood asana nudist shamanic
              crystalhealing Harbin, vinyasa closingcircle co-op
              reproductivesystem seaweedtempeh chanting.
            </p>
            <h1 className="p-10 text-white text-4xl mt-10">hello</h1>
          </div>
        </div>
      </div>


      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-6 lg:right-12 flex flex-col items-center animate-bounce-slow">
        <div className="w-px h-14 bg-gradient-to-b from-transparent via-white/70 to-transparent"></div>
      </div>


    
    </section>
  );
};
