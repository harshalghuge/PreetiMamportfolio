import React from 'react';

export const About = () => {
  return (
    <div className="bg-white">
      {/* Hero Section - Fixed Background */}
      <section className="relative h-[380px] flex items-center justify-center overflow-hidden bg-white">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed rounded-b-[2rem] "
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=2070&auto=format&fit=crop')",
            backgroundColor: "white",
          }}
        >
          <div className="absolute inset-0 bg-black/40 bg-white -z-100" ></div>
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
                  I'm a psychotherapist specializing in expressive movement therapy, with a unique background that bridges the worlds of spatial design and mental health.
                </p>
                <p>
                  For 18 years, I shaped physical spaces; now, I help people reshape their inner landscapes. My work is rooted in the belief that healing happens not just through words, but through the body's wisdom and creative expression.
                </p>
                <p>
                  Every person carries their own story, their own rhythm. My role is to create a safe space where you can explore, express, and transform.
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

      {/* Journey Section - Fixed Background */}
      <section className="relative py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop')"
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
                Bachelor's in Arts (Psychology), giving me the theoretical groundwork to understand the human mind and behavior.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">Creative Years</h3>
              <p className="text-stone-200 leading-relaxed">
                18 years in spatial design taught me how environments shape our experiences, emotions, and wellbeing.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">Evolution</h3>
              <p className="text-stone-200 leading-relaxed">
                Currently pursuing a Master's in Expressive Movement Therapy, integrating body, mind, and creative expression.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">Continuous Learning</h3>
              <p className="text-stone-200 leading-relaxed">
                Trained with Dr. Daniel Siegel and attending international trauma conferences in London and Barcelona.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section - Image Left, Text Right */}
      <section className="py-24 lg:py-32 bg-stone-50">
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
                  I believe in meeting you where you are. Whether you're dealing with trauma, navigating life transitions, or seeking deeper self-understanding, my approach combines evidence-based therapy with creative, body-centered practices.
                </p>
                <p>
                  Drawing from my design background, I help you create new internal architectures—spaces within yourself where healing and growth can flourish.
                </p>
                <p>
                  Movement becomes a language when words aren't enough. Expression becomes healing when we honor what the body holds.
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
                <svg className="w-8 h-8 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-3">Compassion</h3>
              <p className="text-stone-600">
                Every person's journey deserves kindness and understanding.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-stone-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-3">Integration</h3>
              <p className="text-stone-600">
                Bringing together mind, body, and creative expression.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-stone-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-3">Authenticity</h3>
              <p className="text-stone-600">
                Creating space for your true self to emerge and be honored.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-stone-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-3">Growth</h3>
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
            backgroundImage: "url('https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=2070&auto=format&fit=crop')"
          }}
        >
          <div className="absolute inset-0 bg-stone-900/80"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 text-white">
          <h2 className="font-serif text-4xl lg:text-5xl font-light mb-6">
            Ready to Begin?
          </h2>
          <p className="text-xl text-stone-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            Whether you're curious about therapy or ready to take the first step, I'm here to support you on your journey.
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

