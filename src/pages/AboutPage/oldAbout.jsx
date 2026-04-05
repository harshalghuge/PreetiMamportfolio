import React from "react";

export const About = () => {
  const journeyNarrative = [
    {
      title: "The Breaking Open",
      image:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1974&auto=format&fit=crop",
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
        "https://images.unsplash.com/photo-1474418397713-7ede21d49118?q=80&w=1974&auto=format&fit=crop",
      paragraphs: [
        "I broke. And in breaking, I finally started looking for answers.",
        "Not in the places I'd been taught to look, not in achievement or productivity or being enough. But in places that scared me. In my body. In my past. In the parts of myself I'd learned to hide.",
        "I went back to school at 40, pursuing a Master's in Expressive Movement Therapy. Not because I wanted another degree, but because I needed to understand: Why does the body remember what the mind forgets?",
        "I trained with Dr. Daniel Siegel in Putting Personalities Into Practices in London. I also flew to London and Barcelona for trauma conferences, sitting in rooms with therapists and researchers who'd spent decades studying what I'd spent a lifetime feeling.",
        "And slowly, something shifted.",
        "I learned that real growth doesn't start with strategy, it starts with understanding yourself. That you can't grow upward without first going downward. That healing isn't about fixing what's broken; it's about uncovering what was always whole.",
        "But most importantly, I learned this:",
        "The education that matters most was never given to us.",
      ],
    },
    {
      title: "The Missing Education",
      image:
        "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=2070&auto=format&fit=crop",
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
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2069&auto=format&fit=crop",
      paragraphs: [
        "Today, I do three things:",
        "Through Young SoulTales, I give children the emotional literacy I wish I'd had at 7, teaching them to understand themselves before the world teaches them to disconnect.",
        "Through SoulTales, I hold space for adults who've achieved everything and still feel empty, creating transformational retreats where you can finally stop performing and start living.",
        "Through Kaifiyat, I facilitate listening circles where healing isn't a privilege; it's accessible to everyone who needs to be truly heard.",
        "Three paths. One truth: You are not broken. You were never broken. You just needed the education no one gave you.",
      ],
    },
    {
      title: "The Invitation",
      image:
        "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=1974&auto=format&fit=crop",
      paragraphs: [
        "I don't have all the answers. I'm still learning, still growing, still completing my Master's degree while building this work.",
        "But I know what it feels like to be lost in your own life. I know the suffocation of roles that don't fit. I know the terror of asking who am I and hearing only silence.",
        "And I know the way back.",
        "If you've read this far, something here resonates.",
        "Maybe you're a parent who wants your children to have what you didn't.",
        "Maybe you've achieved everything and still feel hollow.",
        "Maybe you're just tired of performing.",
        "Trust that instinct. It's trying to bring you home.",
      ],
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section - Fixed Background */}
      <section className="relative h-[380px] flex items-center justify-center overflow-hidden">
        <div className="bg-white "></div>
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed rounded-b-[2rem]
             bg-[url('/images/aboutBg_mobile.JPEG')]
             md:bg-[url('/images/IMG_4276.JPEG')]"
        >
          <div className="absolute inset-0 bg-black/40 rounded-b-[2rem]"></div>
        </div>

        <div className="relative z-10 text-center text-white px-6">
          <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-light mb-6">
            Preeti Toraskar
          </h1>
          <p className="text-xl md:text-2xl font-light tracking-wider">
            Psychotherapist · Spatial Designer · Movement Therapist
          </p>
        </div>
      </section>

      {/* Who I Am Section - Text Left, Image Right */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="font-serif text-4xl lg:text-5xl font-light text-stone-800 mb-8">
                Who I Am
              </h2>
              <div className="space-y-6 text-stone-600 text-lg leading-relaxed">
                <p>
                  I'm Preeti - and I spent years searching for something I couldn't name. 
                </p>
                <p>
                  A feeling of being at home in my own life. A sense that I was living, not just performing. 
                </p>
                <p>
                  The answer wasn't in achievement or success. It was in the education no one ever gave us: 
                  how to understand ourselves.
                </p>
                <p>
                  That became my life's work. 
                </p>
              </div>
            </div>
            <div className="relative h-[500px] lg:h-[600px]">
              <img
                src="/images/mobilebg1.JPEG"
                alt="Preeti Toraskar"
                className="w-full h-full object-cover rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Extended Story Section */}
      <section className="py-10 lg:py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16 lg:space-y-24">
          {journeyNarrative.map((section, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={section.title}
                className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
              >
                <div className={`fade-up ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <img
                    src={section.image}
                    alt={section.title}
                    className="w-full h-[340px] md:h-[420px] object-cover rounded-2xl shadow-xl"
                  />
                </div>

                <div className={`fade-up ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                  <h2 className="font-serif text-4xl lg:text-5xl font-light text-stone-800 mb-6">
                    {section.title}
                  </h2>
                  <div className="space-y-4 text-stone-600 text-lg leading-relaxed">
                    {section.paragraphs.map((paragraph) => (
                      <p key={`${section.title}-${paragraph.slice(0, 24)}`}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Journey Section - Fixed Background */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-stone-900/75"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 text-white">
          <h2 className="font-serif text-4xl lg:text-5xl font-light text-center mb-16">
            The Journey So Far
          </h2>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">Foundation</h3>
              <p className="text-stone-200 leading-relaxed">
                Bachelor's in Arts (Psychology), giving me the theoretical
                groundwork to understand the human mind and behavior.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">Creative Years</h3>
              <p className="text-stone-200 leading-relaxed">
                18 years in spatial design taught me how environments shape our
                experiences, emotions, and wellbeing.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">Evolution</h3>
              <p className="text-stone-200 leading-relaxed">
                Currently pursuing a Master's in Expressive Movement Therapy,
                integrating body, mind, and creative expression.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">
                Continuous Learning
              </h3>
              <p className="text-stone-200 leading-relaxed">
                Trained with Dr. Daniel Siegel and attending international
                trauma conferences in London and Barcelona.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section - Image Left, Text Right */}
      <section className="py-24 lg:py-26 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative h-[500px] lg:h-[600px] order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2070&auto=format&fit=crop"
                alt="Therapeutic approach"
                className="w-full h-full object-cover rounded-lg shadow-2xl"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-serif text-4xl lg:text-5xl font-light text-stone-800 mb-8">
                My Approach
              </h2>
              <div className="space-y-6 text-stone-600 text-lg leading-relaxed">
                <p>
                  I believe in meeting you where you are. Whether you're dealing
                  with trauma, navigating life transitions, or seeking deeper
                  self-understanding, my approach combines evidence-based
                  therapy with creative, body-centered practices.
                </p>
                <p>
                  Drawing from my design background, I help you create new
                  internal architectures—spaces within yourself where healing
                  and growth can flourish.
                </p>
                <p>
                  Movement becomes a language when words aren't enough.
                  Expression becomes healing when we honor what the body holds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Clean Grid */}
      <section className="py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <h2 className="font-serif text-4xl lg:text-5xl font-light text-stone-800 text-center mb-16">
            Core Values
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-stone-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-stone-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-3">
                Compassion
              </h3>
              <p className="text-stone-600">
                Every person's journey deserves kindness and understanding.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-stone-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-stone-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-3">
                Integration
              </h3>
              <p className="text-stone-600">
                Bringing together mind, body, and creative expression.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-stone-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-stone-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-3">
                Authenticity
              </h3>
              <p className="text-stone-600">
                Creating space for your true self to emerge and be honored.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-stone-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-stone-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-3">
                Growth
              </h3>
              <p className="text-stone-600">
                Continuous learning and evolution in service of healing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Fixed Background */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=2070&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-stone-900/80"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 text-white">
          <h2 className="font-serif text-4xl lg:text-5xl font-light mb-6">
            Ready to Begin?
          </h2>
          <p className="text-xl text-stone-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            Whether you're curious about therapy or ready to take the first
            step, I'm here to support you on your journey.
          </p>
          <a
            href="/contact"
            className="inline-block px-12 py-4 bg-white text-stone-900 rounded-full font-medium text-lg tracking-wide hover:bg-stone-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            Book a Discovery Call
          </a>
        </div>
      </section>
    </div>
  );
};
