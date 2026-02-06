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
      title: "Young Soul'Tales",
      subtitle: "For Children & Parents",
      quote: "The Missing Education",
      description:
        "Teaching children the emotional skills they deserve from the start, before the world teaches them to disconnect from themselves.",
      image:
        "./images/youngsoul1.jpeg",
      color: "#f1a14b",
      bgColor: "#fef9f3",
    },
    {
      number: "02",
      title: "Soul'Tales",
      subtitle: "For Adults",
      quote: "The Space Between",
      description:
        "Life isn't about birth and death, it's about everything in between. Transformational retreats for adults.",
      image:
        "./images/IMG9.jpeg",
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
        "./images/kaifiat1.png",
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
      <div className="py-15 px-4 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-serif text-[#2a2a2a] mb-6">
          Three Paths, One Philosophy
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          Learning to be present to yourself is the foundation of a fully lived
          life — at any age.
        </p>
      </div>

      {/* Cards Container */}
      <div className="cards-container w-full min-h-screen pt-[100px] pb-[50px] border-t-2 border-b-2 border-dashed border-[#d0cdc3]">
        <div className="cards w-full max-w-[1200px] mx-auto px-5 md:px-8 lg:px-12">
          {cards.map((card, index) => (
            <div
              key={card.number}
              ref={(el) => (wrappersRef.current[index] = el)}
              className="card-wrapper w-full mb-[50px] last:mb-0"
              style={{ perspective: "500px" }}
            >
              <div
                ref={(el) => (cardsRef.current[index] = el)}
                className="card w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
              >
                <div
                  className={`grid md:grid-cols-2 ${
                    index % 2 === 1 ? "md:grid-flow-dense" : ""
                  }`}
                >
                  {/* Image */}
                  <div
                    className={`relative h-[230px] md:h-[500px] lg:h-[100%] overflow-hidden group ${
                      index % 2 === 1 ? "md:col-start-2" : ""
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30 group-hover:from-black/0 group-hover:to-black/20 transition-all duration-500 z-10" />
                    <img
                      src={card.image}
                      alt={card.title}
                      className="absolute inset-0 w-full h-[100%] object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
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
                    className={`flex flex-col justify-center p-8 md:p-12 lg:p-16 ${
                      index % 2 === 1 ? "md:col-start-1" : ""
                    }`}
                    style={{ backgroundColor: card.bgColor }}
                  >
                    <span
                      className="inline-block mb-5 px-5 py-2 rounded-full text-xs tracking-widest uppercase self-start font-semibold"
                      style={{
                        backgroundColor: card.color + "25",
                        color: card.color,
                      }}
                    >
                      {card.subtitle}
                    </span>

                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-4 text-[#1a1a1a] leading-tight">
                      {card.title}
                    </h3>

                    <p
                      className="text-xl md:text-2xl lg:text-3xl font-serif italic mb-6 leading-relaxed"
                      style={{ color: card.color }}
                    >
                      "{card.quote}"
                    </p>

                    <p className="text-base lg:text-lg text-gray-700 leading-relaxed mb-8">
                      {card.description}
                    </p>

                    <button
                      className="group self-start px-8 py-3.5 rounded-full text-white text-sm font-medium tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-xl inline-flex items-center gap-2"
                      style={{
                        backgroundColor: card.color,
                        boxShadow: `0 4px 14px ${card.color}40`,
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
      <div className="w-screen h-40"></div>
    </section>
  );
};

export default WorkTogether;