import React from "react";
import { motion } from "framer-motion";

export const About = () => {
  const aboutImageClass = "w-full aspect-[4/5] max-h-[70vh] object-cover";

  const journeyNarrative = [
    {
      title: "The Breaking Open",
      image:
        "/images/breakDown.jpg",
      paragraphs: [
        "For 18 years, I designed spaces. Beautiful ones. Homes where families were supposed to thrive. Offices where people were supposed to feel inspired.",
        "I was good at it. Successful. But inside? I was disappearing.",
        "I woke up one day and didn't recognize the woman in the mirror.",
        "Not because I'd changed, but because I'd never actually known her. I'd spent so long being what everyone needed that I'd forgotten to ask: Who am I when no one's watching?",
        "The worst part? I thought this was just how life worked. You grow up. You achieve. You sacrifice. You become smaller and smaller until you fit perfectly into the roles assigned to you.",
        "I thought something was wrong with me.",
        "Turns out, something was missing from all of us.",
      ],
    },
    {
      title: "The Searching",
      image:
        "/images/TheSearching.jpg",
      paragraphs: [
        "I broke. And in breaking, I finally started looking for answers.",
        "Not in the places I'd been taught to look, not in achievement or productivity or being enough. But in places that scared me. In my body. In my past. In the parts of myself I'd learned to hide.",
        "I went back to school at 40, pursuing a Master's in Expressive Movement Therapy. Not because I wanted another degree, but because I needed to understand: Why does the body remember what the mind forgets?",
        "I trained with Dr. Daniel Siegel in Putting Personalities Into Practices in London. I also flew to London and Barcelona for trauma conferences, sitting in rooms with therapists and researchers who'd spent decades studying what I'd spent a lifetime feeling.",
        "And slowly, something shifted.",
        "I learned that real growth doesn't start with strategy, it starts with understanding yourself. That you can't grow upward without first going downward. That healing isn't about fixing what's broken; it's about uncovering what was always whole.",
        "But most importantly, I learned this: The education that matters most was never given to us.",
        
      ],
    },
    {
      title: "The Missing Education",
      image:
        "/images/MissingEducation.avif",
      paragraphs: [
        "We learn math. We learn language. We learn history.",
        "But no one teaches us how to understand our own hearts.",
        "How to feel fully without being overwhelmed.",
        "How to be with ourselves without running away.",
        "How to recognize our patterns before they become our prisons.",
        "I had a Bachelor's in Psychology and 18 years of professional success, and still, I didn't know how to answer the simplest question: Who am I?",
        "Because knowing about emotions isn't the same as knowing how to feel them.",
        "Understanding theory isn't the same as understanding yourself.",
        "That missing education became my life's work.",
        "Not just for me. For my daughter. For the women who've disappeared behind their roles. For the children who are learning to achieve but not to be.",
      ],
    },
    {
      title: "The Work Now",
      image:
        "/images/WorkWithme.webp",
      paragraphs: [
        "Today, I do three things:",
        "Through Young SoulTales, I give children the emotional literacy I wish I'd had at 7, teaching them to understand themselves before the world teaches them to disconnect.",
        "Through SoulTales, I hold space for adults who've achieved everything and still feel empty, creating transformational retreats where you can finally stop performing and start living.",
        "Through Kaifiyat, I facilitate listening circles where healing isn't a privilege; it's accessible to everyone who needs to be truly heard.",
        "Three paths. One truth: You are not broken. You were never broken. You just needed the education no one gave you.",
      ],
    },
  ];

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const narrativeTones = [
    { bg: "bg-[#EEE8DF]", border: "border-stone-300", heading: "text-stone-800", body: "text-stone-700" },
    { bg: "bg-[#E7E0D6]", border: "border-stone-300", heading: "text-stone-800", body: "text-stone-700" },
    { bg: "bg-[#DFD7CC]", border: "border-stone-400", heading: "text-stone-800", body: "text-stone-700" },
    { bg: "bg-[#D7CFC3]", border: "border-stone-400", heading: "text-stone-800", body: "text-stone-700" },
  ];

  const sevenTruths = [
    "You are not who you think you are. You are what your circumstances made you. But you get to choose what you become.",
    "The life you want isn't somewhere else. It's right here, waiting for your attention.",
    "You can't grow upward without first going downward. Your roots, even the dark ones, are what hold you.",
    "What happened to you shaped you. It doesn't have to define you.",
    "What you don't face follows you. What you meet head on transforms you.",
    "The body remembers what the mind forgets. Real change starts there.",
    "Healing isn't fixing what's broken. It's uncovering what was always whole.",
  ];

  return (
    <div className="bg-[#FAF9F6] text-stone-900 overflow-x-hidden">
      {/* --- HERO SECTION --- */}
     <section className="relative h-[380px] flex items-center justify-center overflow-hidden">
        <div className="bg-white "></div>
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed rounded-b-[2rem] 
             bg-[url('/images/cover_abt3.JPEG')]
             md:bg-[url('/images/cover_abt2.JPEG')]
            "
        >
          <div className="absolute inset-0 bg-black/40 rounded-b-[2rem]"></div>
        </div>

        <div className="relative z-10 text-center text-white px-6">
          <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-light mb-6">
            Who I am
          </h1>
          <p className="text-xl md:text-2xl font-light tracking-wider">
            Psychotherapist · Spatial Designer · Movement Therapist
          </p>
        </div>
      </section>

      {/* --- WHO I AM (Poster Style) --- */}
      <section id="who-i-am" className="py-22 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <motion.div {...fadeUp} className="lg:col-span-7">
              {/* <h2 className="font-serif text-4xl lg:text-6xl mb-6 text-stone-800">
                - About me
              </h2> */}

              <div className="max-w-xl space-y-8  text-xl text-stone-600 leading-relaxed font-light">
                <p>
                  I'm Preeti - and I spent years searching for something I
                  couldn't name.
                </p>
                <p>
                  A feeling of being at home in my own life. A sense that I was
                  living, not just performing.
                </p>
                <p>
                  The answer wasn't in achievement or success. It was in the
                  education no one ever gave us: how to understand ourselves.
                </p>
                <p className="font-medium text-stone-900 italic">
                  That became my life's work.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="lg:col-span-5 relative"
            >
              <div className="absolute -inset-4 border border-stone-200 z-0" />
              <img
                src="/images/mobilebg1.JPEG"
                className={`relative z-10 grayscale-[20%] hover:grayscale-0 transition-all duration-700 shadow-2xl ${aboutImageClass}`}
                alt="Portrait"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SCROLLYTELLING NARRATIVE --- */}
      {journeyNarrative.map((section, idx) => {
        const tone = narrativeTones[idx % narrativeTones.length];
        return (
        <section
          key={idx}
          className={`relative min-h-screen py-16 flex items-center border-b ${tone.border} ${tone.bg}`}
        >
          <div className="max-w-7xl mx-auto px-6">
            <motion.img
              initial={{ scale: 1.2, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5 }}
              src={section.image}
              className={`${aboutImageClass} rounded-sm shadow-sm mb-6 lg:mb-4 ${
                idx === 2 ? "lg:w-[46%] xl:w-[42%]" : "lg:w-[42%] xl:w-[38%]"
              } ${idx % 2 === 0 ? "lg:float-left lg:mr-12" : "lg:float-right lg:ml-12"}`}
            />
            <motion.h3
              {...fadeUp}
              className={`font-serif text-4xl lg:text-6xl mb-6 ${tone.heading}`}
            >
              {section.title}
            </motion.h3>
            <div className="space-y-3 text-justify">
              {section.paragraphs.map((p, pIdx) => (
                <motion.p
                  key={pIdx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: pIdx * 0.1, duration: 0.6 }}
                  className={`text-lg leading-relaxed font-light ${tone.body}`}
                >
                  {p}
                </motion.p>
              ))}
            </div>
            <div className="clear-both" />
          </div>
        </section>
      )})}

      {/* --- INFOGRAPHIC JOURNEY --- */}
      {/* <section className="bg-stone-900 py-32 text-stone-200">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-5xl font-light text-center mb-24">
            The Journey So Far
          </h2>
          <div className="grid md:grid-cols-2 gap-px bg-stone-800 border border-stone-800">
            <div className="p-12 bg-stone-900 hover:bg-stone-800 transition-colors">
              <span className="text-stone-500 text-sm mb-4 block">01</span>
              <h4 className="text-2xl font-serif mb-4 text-white">
                Foundation
              </h4>
              <p className="font-light leading-relaxed">
                Bachelor's in Arts (Psychology), giving me the theoretical
                groundwork to understand the human mind and behavior.
              </p>
            </div>
            <div className="p-12 bg-stone-900 hover:bg-stone-800 transition-colors">
              <span className="text-stone-500 text-sm mb-4 block">02</span>
              <h4 className="text-2xl font-serif mb-4 text-white">
                Creative Years
              </h4>
              <p className="font-light leading-relaxed">
                18 years in spatial design taught me how environments shape our
                experiences, emotions, and wellbeing.
              </p>
            </div>
            <div className="p-12 bg-stone-900 hover:bg-stone-800 transition-colors">
              <span className="text-stone-500 text-sm mb-4 block">03</span>
              <h4 className="text-2xl font-serif mb-4 text-white">Evolution</h4>
              <p className="font-light leading-relaxed">
                Currently pursuing a Master's in Expressive Movement Therapy,
                integrating body, mind, and creative expression.
              </p>
            </div>
            <div className="p-12 bg-stone-900 hover:bg-stone-800 transition-colors">
              <span className="text-stone-500 text-sm mb-4 block">04</span>
              <h4 className="text-2xl font-serif mb-4 text-white">
                Continuous Learning
              </h4>
              <p className="font-light leading-relaxed">
                Trained with Dr. Daniel Siegel and attending international
                trauma conferences in London and Barcelona.
              </p>
            </div>
          </div>
        </div>
      </section> */}

     

      {/* --- SEVEN TRUTHS --- */}
      <section className="py-32 px-6 bg-[#D9CCBC] text-stone-800">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-xs md:text-sm tracking-[0.2em] uppercase text-stone-600 mb-6">
            What I Believe
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-center mb-16 italic">
            Seven truths I've learned the hard way
          </h2>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {sevenTruths.map((truth, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`group rounded-xl border border-white/45 bg-white/22 backdrop-blur-md shadow-[0_10px_30px_rgba(60,42,26,0.12)] p-6 md:p-7 ${
                  i === sevenTruths.length - 1
                    ? "md:col-span-2 md:max-w-[520px] md:mx-auto w-full"
                    : ""
                }`}
              >
                <div className="flex items-start gap-5">
                  <div className="font-serif text-3xl text-stone-700 leading-none min-w-[2.2rem]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p className="text-base md:text-lg leading-relaxed text-stone-700 font-light group-hover:text-stone-900 transition-colors">
                    {truth}
                  </p>
                </div>
              </motion.article>
            ))}
          
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-40 bg-stone-900 text-white text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.2 }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"
        />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h2 className="font-serif text-6xl font-light mb-6">
            Ready to Begin?
          </h2>
          <p className="text-xl font-light text-stone-300 mb-12">
            Whether you're curious about therapy or ready to take the first
            step, I'm here to support you on your journey.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-14  rounded-2xl py-5 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 text-sm uppercase tracking-[0.02em] md:tracking-[0.3em]"
          >
            Book a Discovery Call
          </motion.a>
        </div>
      </section>
    </div>
  );
};
