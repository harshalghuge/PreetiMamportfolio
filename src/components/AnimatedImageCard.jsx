import { useEffect, useRef } from "react";

const DEFAULT_IMAGE =
  "https://images.squarespace-cdn.com/content/v1/6533c4b5460fb876e598d099/0a7000dd-555a-4d50-99df-284e1b4791aa/pexels-paul-voie-2763355.jpg";

const AnimatedImageCard = ({
  image,
  animate = false,
  intensity = 70,
}) => {
  const imgRef = useRef(null);

  useEffect(() => {
    if (!animate || !imgRef.current) return;

    // ✅ Animate only on large screens (lg ≥ 1024px)
    const isLargeScreen = window.matchMedia("(min-width: 1024px)").matches;
    if (!isLargeScreen) return;

    const onScroll = () => {
      const rect = imgRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      const progress = 1 - rect.top / vh;
      const move = Math.max(
        -intensity,
        Math.min(progress * intensity, intensity)
      );

      imgRef.current.style.transform = `translate(${move}px, ${move}px) scale(1.15)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [animate, intensity]);

  return (
    <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
      <div className="w-[60%] md:w-full h-full flex items-center justify-center bg-cover">
        <img
          ref={imgRef}
          src={image?.trim() || DEFAULT_IMAGE}
          alt=""
          loading="lazy"
          className="object-cover bg-cover w-full h-full will-change-transform"
          style={!animate ? { transform: "none" } : undefined}
        />
      </div>
    </div>
  );
};

export default AnimatedImageCard;
