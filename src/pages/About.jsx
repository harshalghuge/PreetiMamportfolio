import React, { useState, useEffect, useRef } from "react";

export const About = () => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Parallax effect for hero section
  const heroTransform = `translateY(${scrollY * 0.5}px)`;
  const heroOpacity = Math.max(0, 1 - scrollY / 600);

  return (
    <div className="relative w-full bg-[#f5f3ed] overflow-hidden">
      {/* Hero Section with Parallax */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#e9e6dc] via-[#f5f3ed] to-[#ebe8e0]">
          {/* Decorative Elements */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#d4a574]/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#c8886f]/10 rounded-full blur-3xl animate-float-delayed"></div>
          
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(#2a2a2a 1px, transparent 1px), linear-gradient(90deg, #2a2a2a 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Hero Content */}
        <div
          className="relative z-10 text-center px-4 max-w-5xl"
          style={{
            transform: heroTransform,
            opacity: heroOpacity,
          }}
        >
          <div className="mb-8 animate-fade-in-up">
            <div className="inline-block">
              <span className="text-sm md:text-base tracking-[0.3em] uppercase text-[#c8886f] font-light">
                About Soul'Tales
              </span>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#c8886f] to-transparent mt-2"></div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#2a2a2a] mb-6 animate-fade-in-up animation-delay-200 leading-tight">
            The Space Between
            <br />
            <span className="text-[#c8886f] italic">Birth & Death</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
            A journey of presence, transformation, and radical self-discovery
          </p>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <span className="text-xs tracking-widest uppercase">Scroll</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section ref={contentRef} className="relative py-24 md:py-32 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section with Image and Text */}
          <StoryBlock
            number="01"
            title="The Beginning"
            content="Soul'Tales began not as a business, but as a calling. In a world that teaches us to perform, to achieve, to become someone other than who we are, we found ourselves asking: What if the work isn't about becoming, but about remembering? What if everything we're searching for is already within us, waiting to be uncovered?"
            image="https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg"
            reverse={false}
          />

          <StoryBlock
            number="02"
            title="The Philosophy"
            content="We believe in the radical power of presence. Not presence as a practice to perfect, but presence as a return to ourselves—to the parts of us that know truth before language, that feel connection before concept. This work isn't about fixing what's broken. It's about uncovering what was always whole."
            image="https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg"
            reverse={true}
          />

          <StoryBlock
            number="03"
            title="The Mission"
            content="Whether working with children who haven't yet learned to abandon themselves, adults ready to remember who they are, or communities healing into their collective potential—our work remains the same: creating spaces where presence is possible, where transformation is inevitable, where becoming fully alive is not just hoped for but experienced."
            image="https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg"
            reverse={false}
          />
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-24 md:py-32 px-4 bg-gradient-to-b from-[#f5f3ed] to-[#e9e6dc]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-6xl font-serif text-[#2a2a2a] mb-6">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we create and every space we hold
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <ValueCard
              icon="🌱"
              title="Radical Presence"
              description="Being fully here, fully now, without agenda or performance. Presence as the foundation of all transformation."
            />
            <ValueCard
              icon="✨"
              title="Wholeness First"
              description="Not fixing what's broken, but uncovering what was always whole. Healing as remembering, not repairing."
            />
            <ValueCard
              icon="🌊"
              title="Authentic Connection"
              description="Real relationships, real vulnerability, real transformation. No masks, no performance, no pretense."
            />
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="relative py-24 md:py-32 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
            {/* Image */}
            <div className="md:col-span-2">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#d4a574]/20 to-[#c8886f]/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                <img
                  src="https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg"
                  alt="Founder"
                  className="relative rounded-2xl shadow-2xl w-full aspect-[3/4] object-cover"
                />
              </div>
            </div>

            {/* Text */}
            <div className="md:col-span-3 space-y-6">
              <div>
                <div className="inline-block mb-4">
                  <span className="text-sm tracking-[0.3em] uppercase text-[#c8886f] font-light">
                    Meet The Founder
                  </span>
                  <div className="h-px w-full bg-gradient-to-r from-[#c8886f] to-transparent mt-2"></div>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif text-[#2a2a2a] mb-4">
                  Preeti Sharma
                </h2>
                <p className="text-lg text-[#c8886f] italic mb-6">
                  "The work chose me long before I chose it"
                </p>
              </div>

              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  For over a decade, I've been exploring what it means to be fully human in a world that often asks us to be anything but. My journey began in corporate spaces, where I witnessed brilliant people disconnected from themselves, and led me to work with children, where I saw the moment disconnection begins.
                </p>
                <p>
                  Today, Soul'Tales is my answer to a simple question: What if we created spaces where people could come home to themselves? Where presence wasn't a practice to perfect but a reality to experience? Where transformation wasn't something we achieved but something we allowed?
                </p>
                <p>
                  This work is my life's devotion—to creating containers where the impossible becomes inevitable, where healing happens not through doing but through being, where we remember what we've always known.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 md:py-32 px-4 bg-[#2a2a2a] text-white overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#d4a574] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#c8886f] rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-serif mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Whether you're 7 or 70, the invitation is the same: to come home to yourself, to be fully present, to be fully alive.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group px-8 py-4 bg-white text-[#2a2a2a] rounded-full text-base tracking-widest uppercase font-light hover:bg-[#d4a574] hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
              <span className="flex items-center justify-center gap-2">
                Explore Programs
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </button>
            
            <button className="px-8 py-4 border-2 border-white/30 text-white rounded-full text-base tracking-widest uppercase font-light hover:border-white hover:bg-white/10 transition-all duration-300">
              Get In Touch
            </button>
          </div>
        </div>
      </section>

      {/* Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(30px, -30px) scale(1.1);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-30px, 30px) scale(1.1);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 20s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 25s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
          opacity: 0;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

// Story Block Component with Scroll Animation
const StoryBlock = ({ number, title, content, image, reverse }) => {
  const [isVisible, setIsVisible] = useState(false);
  const blockRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (blockRef.current) {
      observer.observe(blockRef.current);
    }

    return () => {
      if (blockRef.current) {
        observer.unobserve(blockRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={blockRef}
      className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center mb-24 md:mb-32 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      } ${reverse ? "md:flex-row-reverse" : ""}`}
    >
      {/* Image */}
      <div className={`${reverse ? "md:order-2" : ""}`}>
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-[#d4a574]/20 to-[#c8886f]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <img
            src={image}
            alt={title}
            className="relative rounded-2xl shadow-xl w-full aspect-[4/3] object-cover transform group-hover:scale-[1.02] transition-transform duration-500"
          />
        </div>
      </div>

      {/* Content */}
      <div className={`space-y-6 ${reverse ? "md:order-1" : ""}`}>
        <div className="text-6xl md:text-7xl font-serif text-[#d4a574]/20">
          {number}
        </div>
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#2a2a2a]">
          {title}
        </h3>
        <p className="text-base md:text-lg text-gray-600 leading-relaxed">
          {content}
        </p>
      </div>
    </div>
  );
};

// Value Card Component
const ValueCard = ({ icon, title, description }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } hover:-translate-y-2`}
    >
      <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-2xl font-serif text-[#2a2a2a] mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};
