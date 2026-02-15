import React, { useRef, useMemo, memo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Timeline item data constant - moved outside to prevent re-renders
 */
const JOURNEY_ITEMS = [
  { title: "Bachelor's in Arts", subtitle: "Psychology", year: "FOUNDATION", side: "left" },
  { title: "18 Years in Spatial Design", subtitle: "Creative expertise", year: "2006-2024", side: "right" },
  { title: "Pursuing Master's", subtitle: "Expressive Movement Therapy", year: "PROGRESS", side: "left" },
  { title: "Dr. Daniel Siegel Training", subtitle: "Putting Personalities into Practice", year: "2024", side: "right" },
  { title: "Transform Trauma", subtitle: "London, 2025", year: "2025", side: "left" },
  { title: "Trauma Congress", subtitle: "Barcelona, 2025", year: "2025", side: "right" }
];

/**
 * Memoized vertical timeline item to prevent unnecessary re-renders
 */
const VerticalTimelineItem = memo(({ item, index, scrollYProgress }) => {
  const itemCount = JOURNEY_ITEMS.length;
  const start = index / itemCount;
  const end = start + 0.15;

  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const x = useTransform(
    scrollYProgress,
    [start, end],
    [item.side === "left" ? -30 : 30, 0]
  );

  return (
    <div className="relative flex items-center min-h-[100px]">
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
});

VerticalTimelineItem.displayName = "VerticalTimelineItem";

/**
 * Memoized horizontal timeline item to prevent unnecessary re-renders
 */
const HorizontalTimelineItem = memo(({ item, index, horizontalScrollProgress }) => {
  const itemCount = JOURNEY_ITEMS.length;
  const start = index / itemCount;
  const end = start + 0.15;

  const opacity = useTransform(horizontalScrollProgress, [start, end], [0, 1]);
  const y = useTransform(
    horizontalScrollProgress,
    [start, end],
    [item.side === "left" ? -30 : 30, 0]
  );

  return (
    <div className="relative flex flex-col items-center" style={{ flex: '0 0 auto', width: '16.666%' }}>
      {/* Content Above Line */}
      {item.side === "left" && (
        <motion.div
          style={{ opacity, y }}
          className="absolute bottom-1/2 pb-10 text-center w-40"
        >
          <div className="text-xs uppercase tracking-widest text-stone-500 mb-2">
            {item.year}
          </div>
          <h3 className="text-lg xl:text-xl font-semibold text-stone-900 mb-1">
            {item.title}
          </h3>
          <p className="text-sm text-stone-600">
            {item.subtitle}
          </p>
        </motion.div>
      )}

      {/* DOT - Centered on line */}
      <motion.div
        style={{ opacity }}
        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-stone-500 z-10"
      />

      {/* Content Below Line */}
      {item.side === "right" && (
        <motion.div
          style={{ opacity, y }}
          className="absolute top-1/2 pt-10 text-center w-40"
        >
          <div className="text-xs uppercase tracking-widest text-stone-500 mb-2">
            {item.year}
          </div>
          <h3 className="text-lg xl:text-xl font-semibold text-stone-900 mb-1">
            {item.title}
          </h3>
          <p className="text-sm text-stone-600">
            {item.subtitle}
          </p>
        </motion.div>
      )}
    </div>
  );
});

HorizontalTimelineItem.displayName = "HorizontalTimelineItem";

/**
 * Main component
 */
export default function JourneySection() {
  const sectionRef = useRef(null);
  const horizontalRef = useRef(null);

  /* VERTICAL SECTION SCROLL PROGRESS */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });

  /* HORIZONTAL SECTION SCROLL PROGRESS */
  const { scrollYProgress: horizontalScrollProgress } = useScroll({
    target: horizontalRef,
    offset: ["start start", "end end"]
  });

  /* CENTER LINE GROW */
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const lineWidth = useTransform(horizontalScrollProgress, [0, 1], ["0%", "100%"]);

  // Memoize vertical items to prevent re-renders on every scroll
  const verticalItems = useMemo(
    () => JOURNEY_ITEMS.map((item, index) => (
      <VerticalTimelineItem
        key={index}
        item={item}
        index={index}
        scrollYProgress={scrollYProgress}
      />
    )),
    [scrollYProgress]
  );

  // Memoize horizontal items to prevent re-renders on every scroll
  const horizontalItems = useMemo(
    () => JOURNEY_ITEMS.map((item, index) => (
      <HorizontalTimelineItem
        key={index}
        item={item}
        index={index}
        horizontalScrollProgress={horizontalScrollProgress}
      />
    )),
    [horizontalScrollProgress]
  );

  return (
    <>
      {/* MOBILE/TABLET - VERTICAL TIMELINE */}
      <div ref={sectionRef} className="lg:hidden px-4 w-full overflow-x-hidden mb-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-light text-stone-700 tracking-wide mb-3">
              The Journey So Far
            </h2>
            <div className="h-[2px] bg-gradient-to-r from-transparent via-[#8B7355] to-transparent transition-all duration-1000 delay-300 w-[70%] mx-auto opacity-100" />
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

            <div className="space-y-5 lg:space-y-16">
              {verticalItems}
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP - HORIZONTAL TIMELINE */}
      <div ref={horizontalRef} className="hidden lg:block h-[500vh] w-full mt-10">
        <div className="sticky top-0 flex items-center justify-center overflow-hidden">
          <div className="w-full max-w-7xl mx-auto px-16 py-2 lg:py-10">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl xl:text-5xl font-light text-stone-700 tracking-wide">
                The Journey So Far
              </h2>
              <div className="h-[3px] bg-gradient-to-r w-[25rem] mx-auto from-transparent via-[#8B7355] to-transparent transition-all duration-1000 delay-300 opacity-100 mt-3" />
            </div>

            {/* Horizontal Timeline Container */}
            <div className="relative w-full">
              {/* Timeline items wrapper */}
              <div className="relative flex justify-between items-center" style={{ minHeight: '400px' }}>
                {/* Static background line */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-px bg-stone-300" />

                {/* Animated horizontal line */}
                <motion.div
                  style={{ width: lineWidth }}
                  className="absolute top-1/2 -translate-y-1/2 left-0 h-px bg-stone-500 origin-left"
                />

                {/* Items */}
                {horizontalItems}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}