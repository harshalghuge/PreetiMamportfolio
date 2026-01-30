import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function JourneySection() {
  const sectionRef = useRef(null);

  const journeyItems = [
    { title: "Bachelor's in Arts", subtitle: "Psychology", year: "FOUNDATION", side: "left" },
    { title: "18 Years in Spatial Design", subtitle: "Creative expertise", year: "2006-2024", side: "right" },
    { title: "Pursuing Master's", subtitle: "Expressive Movement Therapy", year: "PROGRESS", side: "left" },
    { title: "Dr. Daniel Siegel Training", subtitle: "Putting Personalities into Practice", year: "2024", side: "right" },
    { title: "Transform Trauma", subtitle: "London, 2025", year: "2025", side: "left" },
    { title: "Trauma Congress", subtitle: "Barcelona, 2025", year: "2025", side: "right" }
  ];

  /* SECTION SCROLL PROGRESS */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });

  /* CENTER LINE GROW */
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={sectionRef} className=" px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-light text-stone-700 tracking-wide">
            The Journey So Far
          </h2>
          <div className="w-12 h-px bg-stone-400 mx-auto mt-2" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Static background line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-stone-300" />

          {/* Animated center line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-1/2 -translate-x-1/2 top-0 w-px bg-stone-500 origin-top"
          />

          <div className="space-y-16">
            {journeyItems.map((item, index) => {
              /* Each item appears when line reaches its progress */
              const start = index / journeyItems.length;
              const end = start + 0.15;

              const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
              const x = useTransform(
                scrollYProgress,
                [start, end],
                [item.side === "left" ? -30 : 30, 0]
              );

              return (
                <div key={index} className="relative flex items-center  min-h-[100px]">
                  {/* LEFT */}
                  {item.side === "left" && (
                    <div className="w-[260px] mr-10 pr-8 flex justify-end">
                      <motion.div
                        style={{ opacity, x }}
                        className="text-right mr-4"
                      >
                        <div className="text-[9px] uppercase tracking-widest text-stone-500 mb-1">
                          {item.year}
                        </div>
                        <h3 className="text-base font-semibold text-stone-900">
                          {item.title}
                        </h3>
                        <p className="text-xs text-stone-600">
                          {item.subtitle}
                        </p>
                      </motion.div>
                    </div>
                  )}

                  {/* DOT */}
                  <div className="absolute left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      style={{ opacity }}
                      className="w-3 h-3 rounded-full bg-white border-2 border-stone-500"
                    />
                  </div>

                  {/* RIGHT */}
                  {item.side === "right" && (
                    <>
                      <div className="w-1/2" />
                      <div className="w-1/2 pl-8">
                        <motion.div
                          style={{ opacity, x }}
                        >
                          <div className="text-[9px] uppercase tracking-widest text-stone-500 mb-1">
                            {item.year}
                          </div>
                          <h3 className="text-base font-semibold text-stone-900">
                            {item.title}
                          </h3>
                          <p className="text-xs text-stone-600">
                            {item.subtitle}
                          </p>
                        </motion.div>
                      </div>
                    </>
                  )}

                  {item.side === "left" && <div className="w-1/2" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
