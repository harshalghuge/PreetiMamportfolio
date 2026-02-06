// import React, { useLayoutEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const WorkTogether = () => {
//   const sectionRef = useRef(null);
//   const cardsRef = useRef([]);

//   const cards = [
//     {
//       number: "01",
//       title: "Young Soul'Tales",
//       subtitle: "For Children & Parents",
//       quote: "The Missing Education",
//       description:
//         "Teaching children the emotional skills they deserve from the start, before the world teaches them to disconnect from themselves.",
//       image:
//         "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&q=80",
//       color: "#f1a14b",
//       bgColor: "#fef9f3",
//     },
//     {
//       number: "02",
//       title: "Soul'Tales",
//       subtitle: "For Adults",
//       quote: "The Space Between",
//       description:
//         "Life isn't about birth and death, it's about everything in between. Transformational retreats for adults.",
//       image:
//         "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80",
//       color: "#c8886f",
//       bgColor: "#faf7f4",
//     },
//     {
//       number: "03",
//       title: "Kaifiyat",
//       subtitle: "For Communities",
//       quote: "Healing Into Potential",
//       description:
//         "Healing isn't about fixing what's broken, it's about uncovering what was always whole.",
//       image:
//         "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80",
//       color: "#d4a574",
//       bgColor: "#f8f5f1",
//     },
//   ];

//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {
//       const cardElements = cardsRef.current.filter(Boolean);
      
//       if (cardElements.length === 0) return;

//       cardElements.forEach((card, index) => {
//         const isLast = index === cardElements.length - 1;
        
//         // Stack offset for visibility
//         const yValue = (cardElements.length - 1 - index) * 30;

//         // Set initial position
//         gsap.set(card, {
//           y: yValue,
//           transformOrigin: "top center",
//         });

//         if (!isLast) {
//           // Pin each card except the last
//           ScrollTrigger.create({
//             trigger: card,
//             start: "top 100px",
//             end: () => `+=${window.innerHeight}`,
//             pin: true,
//             pinSpacing: false,
//             scrub: 1,
//           });

//           // Fade and move up the current card
//           gsap.to(card, {
//             y: -80,
//             opacity: 0,
//             scrollTrigger: {
//               trigger: card,
//               start: "top 100px",
//               end: () => `+=${window.innerHeight}`,
//               scrub: 1,
//             },
//           });
//         } else {
//           // Last card - pin with spacing to prevent overlap
//           ScrollTrigger.create({
//             trigger: card,
//             start: "top 100px",
//             end: () => `+=${window.innerHeight * 0.5}`,
//             pin: true,
//             pinSpacing: true, // Changed to true for last card
//             scrub: 1,
//           });
//         }

//         // Bring next card forward
//         if (index > 0) {
//           const prevCard = cardElements[index - 1];
          
//           gsap.to(card, {
//             y: 0,
//             scrollTrigger: {
//               trigger: prevCard,
//               start: "top 100px",
//               end: () => `+=${window.innerHeight}`,
//               scrub: 1,
//             },
//           });
//         }
//       });
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section ref={sectionRef} className="w-full bg-[#e9e6dc]">
//       {/* Header */}
//       <div className="py-24 px-4 text-center max-w-4xl mx-auto">
//         <h2 className="text-4xl md:text-6xl font-serif text-[#2a2a2a] mb-6">
//           Three Paths, One Philosophy
//         </h2>
//         <p className="text-lg text-gray-600 leading-relaxed">
//           Learning to be present to yourself is the foundation of a fully lived
//           life — at any age.
//         </p>
//       </div>

//       {/* Desktop Stack */}
//       <div className="hidden md:block pb-20">
//         {cards.map((card, index) => (
//           <div
//             key={card.number}
//             ref={(el) => (cardsRef.current[index] = el)}
//             className="card-stack"
//           >
//             <div className="max-w-6xl mx-auto px-6 py-4">
//               <div 
//                 className="bg-white rounded-3xl overflow-hidden"
//                 style={{
//                   boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05)',
//                 }}
//               >
//                 <div
//                   className={`grid md:grid-cols-2 ${
//                     index % 2 === 1 ? "md:grid-flow-dense" : ""
//                   }`}
//                 >
//                   {/* Image */}
//                   <div 
//                     className={`relative min-h-[500px] overflow-hidden group ${
//                       index % 2 === 1 ? "md:col-start-2" : ""
//                     }`}
//                   >
//                     <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30 group-hover:from-black/0 group-hover:to-black/20 transition-all duration-500 z-10" />
//                     <img
//                       src={card.image}
//                       alt={card.title}
//                       className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
//                     />
//                     <div
//                       className="absolute top-8 left-8 text-9xl font-serif opacity-15 z-20 select-none"
//                       style={{ color: card.color }}
//                     >
//                       {card.number}
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div
//                     className={`flex flex-col justify-center p-12 lg:p-16 ${
//                       index % 2 === 1 ? "md:col-start-1" : ""
//                     }`}
//                     style={{ backgroundColor: card.bgColor }}
//                   >
//                     <span
//                       className="inline-block mb-5 px-5 py-2 rounded-full text-xs tracking-widest uppercase self-start font-semibold"
//                       style={{
//                         backgroundColor: card.color + "25",
//                         color: card.color,
//                       }}
//                     >
//                       {card.subtitle}
//                     </span>

//                     <h3 className="text-4xl lg:text-5xl font-serif mb-4 text-[#1a1a1a] leading-tight">
//                       {card.title}
//                     </h3>

//                     <p
//                       className="text-2xl lg:text-3xl font-serif italic mb-6 leading-relaxed"
//                       style={{ color: card.color }}
//                     >
//                       "{card.quote}"
//                     </p>

//                     <p className="text-base lg:text-lg text-gray-700 leading-relaxed mb-8">
//                       {card.description}
//                     </p>

//                     <button
//                       className="group self-start px-8 py-3.5 rounded-full text-white text-sm font-medium tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-xl inline-flex items-center gap-2"
//                       style={{ 
//                         backgroundColor: card.color,
//                         boxShadow: `0 4px 14px ${card.color}40`
//                       }}
//                     >
//                       <span>Explore Journey</span>
//                       <svg
//                         className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M17 8l4 4m0 0l-4 4m4-4H3"
//                         />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Mobile */}
//       <div className="md:hidden px-4 pb-20 space-y-8">
//         {cards.map((card) => (
//           <div
//             key={card.number}
//             className="bg-white rounded-2xl overflow-hidden shadow-lg"
//           >
//             <div className="relative h-64">
//               <div className="absolute inset-0 bg-black/20 z-10" />
//               <img
//                 src={card.image}
//                 alt={card.title}
//                 className="w-full h-full object-cover"
//               />
//               <div
//                 className="absolute top-6 left-6 text-6xl font-serif opacity-20 z-20"
//                 style={{ color: card.color }}
//               >
//                 {card.number}
//               </div>
//             </div>
//             <div
//               className="p-6 space-y-4"
//               style={{ backgroundColor: card.bgColor }}
//             >
//               <span
//                 className="inline-block px-3 py-1 rounded-full text-xs tracking-widest uppercase"
//                 style={{
//                   backgroundColor: card.color + "20",
//                   color: card.color,
//                 }}
//               >
//                 {card.subtitle}
//               </span>
//               <h3 className="text-2xl font-serif">{card.title}</h3>
//               <p
//                 className="text-lg italic font-serif"
//                 style={{ color: card.color }}
//               >
//                 "{card.quote}"
//               </p>
//               <p className="text-sm text-gray-700 leading-relaxed">
//                 {card.description}
//               </p>
//               <button
//                 className="w-full px-6 py-3 rounded-full text-white text-sm tracking-wide"
//                 style={{ backgroundColor: card.color }}
//               >
//                 Explore Journey →
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default WorkTogether;

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WorkTogether = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const mobileCardsRef = useRef([]);

  const cards = [
    {
      number: "01",
      title: "Young Soul'Tales",
      subtitle: "For Children & Parents",
      quote: "The Missing Education",
      description:
        "Teaching children the emotional skills they deserve from the start, before the world teaches them to disconnect from themselves.",
      image:
        "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&q=80",
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
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80",
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
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80",
      color: "#d4a574",
      bgColor: "#f8f5f1",
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const cardElements = cardsRef.current.filter(Boolean);

        if (cardElements.length === 0) return;

        cardElements.forEach((card, index) => {
          const isLast = index === cardElements.length - 1;

          // Stack offset for visibility
          const yValue = (cardElements.length - 1 - index) * 30;

          // Set initial position
          gsap.set(card, {
            y: yValue,
            transformOrigin: "top center",
          });

          if (!isLast) {
            // Pin each card except the last
            ScrollTrigger.create({
              trigger: card,
              start: "top 100px",
              end: () => `+=${window.innerHeight}`,
              pin: true,
              pinSpacing: false,
              scrub: 1,
            });

            // Fade and move up the current card
            gsap.to(card, {
              y: -80,
              opacity: 0,
              scrollTrigger: {
                trigger: card,
                start: "top 100px",
                end: () => `+=${window.innerHeight}`,
                scrub: 1,
              },
            });
          } else {
            // Last card - pin with spacing to prevent overlap
            ScrollTrigger.create({
              trigger: card,
              start: "top 100px",
              end: () => `+=${window.innerHeight * 0.5}`,
              pin: true,
              pinSpacing: true,
              scrub: 1,
            });
          }

          // Bring next card forward
          if (index > 0) {
            const prevCard = cardElements[index - 1];

            gsap.to(card, {
              y: 0,
              scrollTrigger: {
                trigger: prevCard,
                start: "top 100px",
                end: () => `+=${window.innerHeight}`,
                scrub: 1,
              },
            });
          }
        });
      });

      mm.add("(max-width: 767px)", () => {
        const mobileCards = mobileCardsRef.current.filter(Boolean);

        if (mobileCards.length === 0) return;

        mobileCards.forEach((card) => {
          gsap.from(card, {
            y: 40,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#e9e6dc]">
      {/* Header */}
      <div className="py-20 px-4 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-serif text-[#2a2a2a] mb-6">
          Three Paths, One Philosophy
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          Learning to be present to yourself is the foundation of a fully lived
          life — at any age.
        </p>
      </div>

      {/* Desktop Stack */}
      <div className="hidden md:block">
        {cards.map((card, index) => (
          <div
            key={card.number}
            ref={(el) => (cardsRef.current[index] = el)}
            className="card-stack"
          >
            <div className="max-w-6xl mx-auto px-6 py-4">
              <div
                className="bg-white rounded-3xl overflow-hidden"
                style={{
                  boxShadow:
                    "0 20px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05)",
                }}
              >
                <div
                  className={`grid md:grid-cols-2 ${
                    index % 2 === 1 ? "md:grid-flow-dense" : ""
                  }`}
                >
                  {/* Image */}
                  <div
                    className={`relative min-h-[420px] md:min-h-[520px] overflow-hidden group ${
                      index % 2 === 1 ? "md:col-start-2" : ""
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30 group-hover:from-black/0 group-hover:to-black/20 transition-all duration-500 z-10" />
                    <img
                      src={card.image}
                      alt={card.title}
                      className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
                    />
                    <div
                      className="absolute top-8 left-8 text-9xl font-serif opacity-15 z-20 select-none"
                      style={{ color: card.color }}
                    >
                      {card.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`flex flex-col justify-center p-12 lg:p-16 ${
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

                    <h3 className="text-4xl lg:text-5xl font-serif mb-4 text-[#1a1a1a] leading-tight">
                      {card.title}
                    </h3>

                    <p
                      className="text-2xl lg:text-3xl font-serif italic mb-6 leading-relaxed"
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
          </div>
        ))}
      </div>

      {/* Mobile */}
      <div className="md:hidden px-4 pb-20 space-y-8">
        {cards.map((card, index) => (
          <div
            key={card.number}
            ref={(el) => (mobileCardsRef.current[index] = el)}
            className="bg-white rounded-2xl overflow-hidden shadow-lg"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <div className="absolute inset-0 bg-black/20 z-10" />
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="absolute top-6 left-6 text-6xl font-serif opacity-20 z-20"
                style={{ color: card.color }}
              >
                {card.number}
              </div>
            </div>
            <div
              className="p-6 space-y-4"
              style={{ backgroundColor: card.bgColor }}
            >
              <span
                className="inline-block px-3 py-1 rounded-full text-xs tracking-widest uppercase"
                style={{
                  backgroundColor: card.color + "20",
                  color: card.color,
                }}
              >
                {card.subtitle}
              </span>
              <h3 className="text-2xl font-serif">{card.title}</h3>
              <p
                className="text-lg italic font-serif"
                style={{ color: card.color }}
              >
                "{card.quote}"
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {card.description}
              </p>
              <button
                className="w-full px-6 py-3 rounded-full text-white text-sm tracking-wide"
                style={{ backgroundColor: card.color }}
              >
                Explore Journey →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkTogether;


