import React, { useEffect, useRef, useState } from 'react';

export default function Journey() {
  const [visibleItems, setVisibleItems] = useState([]);
  const sectionRef = useRef(null);

  const journeyItems = [
    {
      title: "Bachelor's in Arts (Psychology)",
      icon: "🎓"
    },
    {
      title: "18 years in spatial design",
      icon: "✨"
    },
    {
      title: "Pursuing Master's in",
      subtitle: "Expressive Movement Therapy",
      icon: "🌱"
    },
    {
      title: "Trained with Dr. Daniel Siegel",
      subtitle: "— Putting Personalities into Practice",
      icon: "🧠"
    },
    {
      title: "Transform Trauma Conference",
      subtitle: "attendee (London, 2025)",
      icon: "🌍"
    },
    {
      title: "Trauma Congress attendee",
      subtitle: "(Barcelona, 2025)",
      icon: "✈️"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            journeyItems.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems((prev) => [...new Set([...prev, index])]);
              }, index * 200);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 to-stone-200 py-20 px-6">
      <div className="max-w-4xl mx-auto" ref={sectionRef}>
        <h2 className="text-5xl font-light text-stone-800 mb-16 text-center tracking-wide">
          THE JOURNEY SO FAR
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-stone-300"></div>

          <div className="space-y-8">
            {journeyItems.map((item, index) => (
              <div
                key={index}
                className={`relative pl-20 transition-all duration-700 ${
                  visibleItems.includes(index)
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-8'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
              >
                {/* Icon circle */}
                <div
                  className={`absolute left-0 w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-2xl transition-all duration-500 ${
                    visibleItems.includes(index)
                      ? 'scale-100 rotate-0'
                      : 'scale-0 rotate-180'
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  {item.icon}
                </div>

                {/* Content card */}
                <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-xl font-medium text-stone-700 mb-1">
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <p className="text-stone-500 text-lg">{item.subtitle}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}