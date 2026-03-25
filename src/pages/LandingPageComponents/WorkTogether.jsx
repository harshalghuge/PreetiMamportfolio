import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WorkTogether = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const wrappersRef = useRef([]);

  const cards = [
    {
      number: "01",
      title: "Young SoulTales",
      subtitle: "For Children & Parents",
      quote: "The Missing Education",
      description:
        "Teaching children the emotional skills they deserve from the start, before the world teaches them to disconnect from themselves.",
      image:
        "/images/youngsoul1.jpeg",
      color: "#f1a14b",
      bgColor: "#fef9f3",
    },
    {
      number: "02",
      title: "SoulTales",
      subtitle: "For Adults",
      quote: "The Space Between",
      description:
        "Life isn't about birth and death, it's about everything in between. Transformational retreats for adults.",
      image:
        "../images/IMG9.jpg",
      color: "#c8886f",
      bgColor: "#faf7f4",
    },
    {
      number: "03",
      title: "Kaifiyat",
      subtitle: "For Communities",
      quote: "Healing Into Potential",
      description:
        "Healing isn't about fixing what's broken, it's about uncovering what was always whole.",
      image:
        "/images/kaifiat1.png",
      color: "#d4a574",
      bgColor: "#f8f5f1",
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cardWrappers = wrappersRef.current.filter(Boolean);
      const cardElements = cardsRef.current.filter(Boolean);

      if (cardWrappers.length === 0 || cardElements.length === 0) return;

      cardWrappers.forEach((wrapper, i) => {
        const card = cardElements[i];
        let scale = 1,
          rotation = 0;
        
        if (i !== cardElements.length - 1) {
          scale = 0.9 + 0.025 * i;
          rotation = -10;
        }

        gsap.to(card, {
          scale: scale,
          rotationX: rotation,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top " + (60 + 10 * i),
            end: "bottom 550",
            endTrigger: sectionRef.current.querySelector(".cards-container"),
            scrub: true,
            pin: wrapper,
            pinSpacing: false,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#e9e6dc]">

      {/* Header */}
      <div className="pt-8 pb-10 px-4 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-serif text-[#2a2a2a] mb-4">
          Three Paths, One Philosophy
        </h2>
        <p className="text-[16px] text-gray-600 leading-relaxed">
          Learning to be present to yourself is the foundation of a fully lived
          life — at any age.
        </p>
      </div>

      {/* Cards Container */}
      <div className="cards-container w-full min-h-screen pt-4 pb-12 border-t border-b border-[#d7d2c7]">
        <div className="cards w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12">
          {cards.map((card, index) => (
            <div
              key={card.number}
              ref={(el) => (wrappersRef.current[index] = el)}
              className="card-wrapper w-full mb-10 last:mb-0"
              style={{ perspective: "500px" }}
            >
              <div
                ref={(el) => (cardsRef.current[index] = el)}
                className="card w-full overflow-hidden rounded-[32px] border border-white/70 bg-white/90 shadow-[0_18px_50px_rgba(71,60,46,0.14)] backdrop-blur-sm"
              >
                <div
                  className={`grid items-stretch md:grid-cols-2 md:min-h-[520px] ${
                    index % 2 === 1 ? "md:grid-flow-dense" : ""
                  }`}
                >
                  {/* Image */}
                <div
                  className={`relative h-[210px] md:h-full overflow-hidden group ${
                    index % 2 === 1 ? "md:col-start-2" : ""
                  }`}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/30 group-hover:from-black/0 group-hover:to-black/20 transition-all duration-500 z-10" />
                    <img
                      src={card.image}
                      alt={card.title}
                      className="absolute inset-0 block w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-700"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <div
                      className="absolute top-8 left-8 text-7xl md:text-9xl font-serif opacity-55 z-20 select-none"
                      style={{ color: card.color }}
                    >
                      {card.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`relative h-full flex flex-col justify-center p-6 md:p-12 lg:p-16 ${
                      index % 2 === 1 ? "md:col-start-1" : ""
                    }`}
                    style={{ backgroundColor: card.bgColor }}
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.65),transparent_45%)] pointer-events-none" />
                    <span
                      className="relative inline-block mb-5 px-5 py-2 rounded-full text-xs tracking-[0.24em] uppercase self-start font-semibold border border-white/60 shadow-sm"
                      style={{
                        backgroundColor: card.color + "25",
                        color: card.color,
                      }}
                    >
                      {card.subtitle}
                    </span>

                    <h3 className="relative text-3xl md:text-4xl lg:text-5xl font-serif mb-4 text-[#1a1a1a] leading-tight">
                      {card.title}
                    </h3>

                    <p
                      className="relative text-xl md:text-2xl lg:text-3xl font-serif italic mb-6 leading-relaxed"
                      style={{ color: card.color }}
                    >
                      "{card.quote}"
                    </p>

                    <p className="relative text-base lg:text-lg text-gray-700 leading-relaxed mb-8 max-w-xl">
                      {card.description}
                    </p>

                    <button
                      className="group relative self-start px-8 py-3.5 rounded-full text-white text-sm font-medium tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-xl inline-flex items-center gap-2"
                      style={{
                        backgroundColor: card.color,
                        boxShadow: `0 10px 24px ${card.color}35`,
                      }}
                    >
                      <span>Explore Journey</span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
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
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spacer */}
      <div className="w-screen h-60 md:h-40"></div>
    </section>
  );
};

export default WorkTogether;
