import React from "react";

const FinalCTA = () => {
  return (
    <section className="bg-[#fbf8f1] py-32">
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          {/* LEFT CONTENT */}
          <div className="text-center lg:text-center max-w-xl">
            <p className="text-xs tracking-widest uppercase mb-6">
              Ready to get started?
            </p>

            <h2 className="font-serif text-4xl lg:text-5xl leading-tight mb-6">
              A FINAL CALL TO
              <br />
              ACTION GOES
              <br />
              RIGHT HERE
            </h2>

            <p className="text-sm leading-relaxed mb-10">
              Universal talkingstick wisdom of your body, healer nonprofit
              retreat kalechips kombucha bethechange reprogramming your DNA
              native american ancestry. Hexayurt bioneers nagchampa tibetan
              singing.
            </p>

            <a
              href="/contact"
              className="inline-block px-8 py-3 border border-black rounded-full text-sm tracking-widest uppercase hover:bg-black hover:text-white transition"
            >
              Book a discovery call
            </a>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center">
            <div className="w-[250px] h-[380px] overflow-hidden rounded-[60%]">
              <img
                src="https://images.squarespace-cdn.com/content/v1/6533c4b5460fb876e598d099/46c095f7-8e54-4a8f-934a-48a0a0530510/camille-brodard-0X1Ic-4YEgI-unsplash.jpg"
                alt="Final CTA visual"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
