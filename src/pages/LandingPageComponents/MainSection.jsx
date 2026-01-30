import { useEffect, useState } from "react";
import AnimatedImageCard from "../../components/AnimatedImageCard";
import JourneySection from "./JourneySection";

const MainSection = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? "down" : "up";
      lastScrollY = currentScrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setOffset((prev) => {
            const step = 1.1;
            if (direction === "up") return Math.min(prev + step, 60);
            return Math.max(prev - step, 0);
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ================= TOP SECTION ================= */}
      <section className="w-full bg-[#F7F4EE]">
        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* IMAGE */}
          <div className="relative h-[420px] md:h-[640px] overflow-hidden order-1 md:order-2">
            <AnimatedImageCard  />
          </div>

          {/* TEXT */}
          <div className="flex items-center justify-center px-10 py-14 md:p-16 order-2 md:order-1">
            {/* <p className="text-center italic text-2xl font-medium leading-6 text-[#000000] max-w-[260px] font-serif">
              Add your brand statement mission statement, or call out your ideal
              clients in this section here.
            </p> */}
            <div className="flex flex-col justify-center items-center px-10 py-14 md:px-20 md:py-16">
            <h2 className="text-3xl font-serif text-[#1D1A13] tracking-wide">
              MEET MINERVA
            </h2>

            <p className="mt-5 text-[18px] leading-5 text-[#2D2A1F] max-w-[520px]">
              Tapping into the blue whale shark turtle energy, tripplethra channel
              typography coldlaid silver fertility awareness divine feminine.
            </p>

            <p className="mt-4 text-[18px] leading-5 text-[#2D2A1F] max-w-[520px]">
              Universal talking stick wisdom of your body, healer nonprofit
              retreat kale chips kombucha beth change programming your DNA.
            </p>

            <button className="mt-6 w-fit border border-[#2D2A1F] px-6 py-2 rounded-full text-[12px] tracking-widest hover:bg-black hover:text-white transition-all">
              LEARN MORE
            </button>
          </div>
          </div>

        </div>
      </section>

      {/* ================= BOTTOM SECTION ================= */}
      <section className="w-full bg-[#F7F4EE]">
        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* IMAGE */}
          <div className="relative h-[420px] md:h-[640px] overflow-hidden">
            <AnimatedImageCard
              image="https://images.squarespace-cdn.com/content/v1/6533c4b5460fb876e598d099/ddc5161d-b93a-4b7b-bf60-fc12dfe19806/ilona-panych-Pzv28NRtgko-unsplash.png?format=2500w"
              
            />
          </div>

          {/* TEXT */}
          <div className="flex flex-col justify-center items-center px-10 py-14 md:px-20 md:py-16">

            {/* ====================================old version==================================== */}
            {/* <h2 className="text-3xl font-serif text-[#1D1A13] tracking-wide">
              MEET MINERVA
            </h2>

            <p className="mt-5 text-[18px] leading-5 text-[#2D2A1F] max-w-[520px]">
              Tapping into the blue whale shark turtle energy, tripplethra channel
              typography coldlaid silver fertility awareness divine feminine.
            </p>

            <p className="mt-4 text-[18px] leading-5 text-[#2D2A1F] max-w-[520px]">
              Universal talking stick wisdom of your body, healer nonprofit
              retreat kale chips kombucha beth change programming your DNA.
            </p>

            <button className="mt-6 w-fit border border-[#2D2A1F] px-6 py-2 rounded-full text-[12px] tracking-widest hover:bg-black hover:text-white transition-all">
              LEARN MORE
            </button> */}

            {/* ====================================journey section==================================== */}
            < JourneySection />
          </div>

        </div>
      </section>
    </>
  );
};

export default MainSection;
