import React, { useState, useEffect, useRef } from "react";

// AnimatedImageCard Component with Modern Scroll Animation
const AnimatedImageCard = ({ image, index }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const cardRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress (0 to 1) based on card visibility
      const cardTop = rect.top;
      const cardHeight = rect.height;
      
      // Progress from 0 (entering viewport) to 1 (leaving viewport)
      const progress = (windowHeight - cardTop) / (windowHeight + cardHeight);
      
      // Clamp between 0 and 1
      const clampedProgress = Math.max(0, Math.min(1, progress));
      
      setScrollProgress(clampedProgress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate parallax transform based on scroll progress
  const getParallaxTransform = () => {
    // Subtle parallax movement
    const movement = (scrollProgress - 0.5) * 50;
    return `translateY(${movement}px)`;
  };

  return (
    <div
      ref={cardRef}
      className="absolute inset-0 w-full h-full overflow-hidden"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 z-[5] transition-all duration-500 group-hover:bg-black/10" />

      {/* Image with parallax scroll animation */}
      <div
        className="w-full h-full transition-transform duration-100 ease-linear"
        style={{
          transform: getParallaxTransform(),
        }}
      >
        <img
          src={image || "https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg"}
          alt="Card background"
          className="w-full h-[110%] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40 z-[6] transition-opacity duration-500 group-hover:opacity-70" />
    </div>
  );
};

// Card Content Component
const CardContent = ({ number, title, subtitle, quote, description, decorativeElement }) => {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
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
      className={`relative z-10 flex flex-col justify-between h-full p-8 md:p-10 lg:p-12 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {/* Top Section */}
      <div className="space-y-6">
        {/* Number */}
        <div className="text-6xl md:text-7xl font-serif text-[#d4a574] opacity-60">
          {number}
        </div>

        {/* Title */}
        <div>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#2a2a2a] mb-2">
            {title}
          </h3>
          <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-gray-500">
            {subtitle}
          </p>
        </div>

        {/* Quote */}
        <p className="text-lg md:text-xl font-serif italic text-[#c8886f] leading-relaxed">
          {quote}
        </p>

        {/* Description */}
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Bottom Section with Decorative Element */}
      <div className="flex items-end justify-between mt-8">
        {/* Explore Button */}
        <button className="group/btn flex items-center gap-2 text-sm md:text-base tracking-[0.15em] uppercase text-gray-700 hover:text-[#c8886f] transition-all duration-300">
          <span>Explore</span>
          <svg 
            className="w-5 h-5 transform group-hover/btn:translate-x-2 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>

        {/* Decorative Line Drawing */}
        <div className="opacity-30 text-[#d4a574]">
          {decorativeElement}
        </div>
      </div>
    </div>
  );
};

// WorkTogether Component
const WorkTogether = () => {
  return (
    <section className="w-full bg-[#e9e6dc] overflow-hidden">
      {/* Heading */}
      <div className="py-16 md:py-24 px-4 flex flex-col items-center justify-center">
        <h2 className="text-xl md:text-2xl lg:text-3xl text-center tracking-[0.2em] uppercase font-light text-[#2a2a2a]">
          Three Paths, One Philosophy
        </h2>
        
        <p className="text-center text-sm md:text-base mt-4 md:mt-6 text-gray-600 max-w-3xl leading-relaxed">
          Whether you're 7 or 70, the work is the same: learning to be fully present to yourself so you can be fully alive.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
        {/* Card 1 - Young Soul'Tales */}
        <article className="relative min-h-[600px] md:min-h-[700px] overflow-hidden group bg-[#ebe8e0] hover:shadow-2xl transition-shadow duration-500">
          <AnimatedImageCard 
            image="https://images.pexels.com/photos/1166643/pexels-photo-1166643.jpeg" 
            index={0}
          />
          
          <CardContent
            number="01"
            title="Young Soul'Tales"
            subtitle="For Children & Parents"
            quote='"The Missing Education"'
            description="Teaching children the emotional skills they deserve from the start, before the world teaches them to disconnect from themselves. Programs for children and workshops for parents."
            decorativeElement={
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M20 40 Q 40 20, 60 40 T 80 60" />
              </svg>
            }
          />
        </article>

        {/* Card 2 - Soul'Tales */}
        <article className="relative min-h-[600px] md:min-h-[700px] overflow-hidden group bg-[#ebe8e0] hover:shadow-2xl transition-shadow duration-500">
          <AnimatedImageCard 
            image="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg" 
            index={1}
          />
          
          <CardContent
            number="02"
            title="Soul'Tales"
            subtitle="For Adults"
            quote='"The Space Between"'
            description="Life isn't about birth and death, it's about everything in between. Transformational retreats for adults ready to wake up to the life they're actually living."
            decorativeElement={
              <svg width="80" height="100" viewBox="0 0 80 100" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M40 20 Q 50 40, 40 60 Q 30 80, 40 100" />
                <circle cx="40" cy="20" r="8" />
              </svg>
            }
          />
        </article>

        {/* Card 3 - Kaifiyat */}
        <article className="relative min-h-[600px] md:min-h-[700px] overflow-hidden group bg-[#ebe8e0] hover:shadow-2xl transition-shadow duration-500 md:col-span-2 lg:col-span-1">
          <AnimatedImageCard 
            image="https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg" 
            index={2}
          />
          
          <CardContent
            number="03"
            title="Kaifiyat"
            subtitle="For Communities"
            quote='"Healing Into Potential"'
            description="Healing isn't about fixing what's broken, it's about uncovering what was always whole. Accessible listening circles for those who need them most."
            decorativeElement={
              <svg width="90" height="80" viewBox="0 0 90 80" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M10 60 Q 30 40, 50 50 Q 70 60, 80 40" />
                <circle cx="50" cy="50" r="5" />
              </svg>
            }
          />
        </article>
      </div>
    </section>
  );
};

export default WorkTogether;