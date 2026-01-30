import React, { useState, useEffect, useRef } from "react";

// Sample blog data - replace with your actual data or API
const sampleBlogs = [
  {
    id: 1,
    title: "Why Your Child Can't Calm Down While Sitting Still",
    excerpt: "Understanding the nervous system's role in children's behavior and emotional regulation.",
    author: "Preeti Sharma",
    date: "December 15, 2024",
    readTime: "8 min read",
    category: "Young Soul'Tales",
    image: "https://images.pexels.com/photos/1166643/pexels-photo-1166643.jpeg",
    mediumUrl: "https://soultales-by-preeti.medium.com/why-your-child-cant-calm-down-while-sitting-still-7737bb14138c",
    featured: true,
  },
  {
    id: 2,
    title: "The Space Between Doing and Being",
    excerpt: "How modern life has disconnected us from the present moment and what we can do about it.",
    author: "Preeti Sharma",
    date: "December 10, 2024",
    readTime: "6 min read",
    category: "Soul'Tales",
    image: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg",
    mediumUrl: "#",
    featured: true,
  },
  {
    id: 3,
    title: "Healing Into Potential: A Community Approach",
    excerpt: "Why listening circles work when traditional therapy doesn't reach everyone.",
    author: "Preeti Sharma",
    date: "December 5, 2024",
    readTime: "10 min read",
    category: "Kaifiyat",
    image: "https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg",
    mediumUrl: "#",
    featured: true,
  },
  {
    id: 4,
    title: "The Missing Education in Our Schools",
    excerpt: "What children need to learn about emotions before academics.",
    author: "Preeti Sharma",
    date: "November 28, 2024",
    readTime: "7 min read",
    category: "Young Soul'Tales",
    image: "https://images.pexels.com/photos/1720186/pexels-photo-1720186.jpeg",
    mediumUrl: "#",
    featured: false,
  },
  {
    id: 5,
    title: "Presence as Practice: Beyond Mindfulness",
    excerpt: "Moving from mindfulness as a technique to presence as a way of being.",
    author: "Preeti Sharma",
    date: "November 20, 2024",
    readTime: "9 min read",
    category: "Soul'Tales",
    image: "https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg",
    mediumUrl: "#",
    featured: false,
  },
];

export const Blog = () => {
  const [blogs, setBlogs] = useState(sampleBlogs);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAddBlogModal, setShowAddBlogModal] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = ["All", "Young Soul'Tales", "Soul'Tales", "Kaifiyat"];

  const filteredBlogs = selectedCategory === "All" 
    ? blogs 
    : blogs.filter(blog => blog.category === selectedCategory);

  const featuredBlogs = blogs.filter(blog => blog.featured).slice(0, 3);
  const latestBlog = blogs[0];

  return (
    <div className="relative w-full bg-[#f5f3ed] overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex  items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#e9e6dc] via-[#f5f3ed] to-[#ebe8e0]">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#d4a574]/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#c8886f]/10 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl py-10">
          <div className="mb-6 animate-fade-in-up">
            <span className="text-sm md:text-base tracking-[0.3em] uppercase text-[#c8886f] font-light">
              Stories & Insights
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#2a2a2a] mb-6 animate-fade-in-up animation-delay-200">
            Soul'Tales
            <br />
            <span className="text-[#c8886f] italic">Blog</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400 mb-8">
            Reflections on presence, transformation, and the journey back to ourselves
          </p>

          {/* Add New Blog Button */}
          <button
            onClick={() => setShowAddBlogModal(true)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#c8886f] text-white rounded-full text-sm tracking-widest uppercase font-light hover:bg-[#d4a574] transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 animate-fade-in-up animation-delay-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Blog
          </button>
        </div>
      </section>

      {/* Featured Blogs Section */}
      <section className="relative py-10 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-[#2a2a2a] mb-4">
              Featured Stories
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#c8886f] to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBlogs.map((blog, index) => (
              <FeaturedBlogCard key={blog.id} blog={blog} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Full Section - Medium Style */}
      <section className="relative py-16 md:py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <span className="text-sm tracking-[0.3em] uppercase text-[#c8886f] font-light">
              Latest Publication
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#2a2a2a] mt-4 mb-6">
              {latestBlog.title}
            </h2>
            
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <span>{latestBlog.author}</span>
              <span>•</span>
              <span>{latestBlog.date}</span>
              <span>•</span>
              <span>{latestBlog.readTime}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={latestBlog.image}
              alt={latestBlog.title}
              className="w-full aspect-[16/9] object-cover"
            />
          </div>

          {/* Article Content - Medium Style Template */}
          <article className="prose prose-lg max-w-none">
            <div className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 font-serif italic">
              {latestBlog.excerpt}
            </div>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-lg">
                Have you ever wondered why some children struggle to sit still during "quiet time"? 
                Why they seem to need constant movement, fidgeting, or stimulation? As parents and 
                educators, we often interpret this as misbehavior or lack of discipline. But what if 
                I told you that the inability to calm down while sitting still has nothing to do with 
                defiance and everything to do with the nervous system?
              </p>

              <h3 className="text-2xl font-serif text-[#2a2a2a] mt-8 mb-4">
                Understanding the Nervous System
              </h3>

              <p className="text-lg">
                Our nervous system is designed to keep us safe. It constantly scans our environment 
                for threats—a process called neuroception. When a child's nervous system perceives 
                danger (real or imagined), it activates a stress response: fight, flight, freeze, or fawn.
              </p>

              <div className="my-8 p-6 bg-[#f5f3ed] rounded-xl border-l-4 border-[#c8886f]">
                <p className="text-lg italic text-gray-700">
                  "The body keeps the score. When we don't feel safe, we cannot access the part of 
                  our brain responsible for calm, presence, and connection."
                </p>
              </div>

              <h3 className="text-2xl font-serif text-[#2a2a2a] mt-8 mb-4">
                Why Sitting Still Feels Impossible
              </h3>

              <p className="text-lg">
                When a child's nervous system is in a state of activation (sympathetic response), 
                sitting still can feel unbearable. Their body is flooded with stress hormones like 
                cortisol and adrenaline, preparing them to move, to act, to survive. Asking them to 
                sit quietly is like asking a smoke alarm to stop ringing while the house is on fire.
              </p>

              {/* Additional Image */}
              <div className="my-12 rounded-xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/1720186/pexels-photo-1720186.jpeg"
                  alt="Child learning"
                  className="w-full aspect-[16/9] object-cover"
                />
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Understanding children's emotional regulation
                </p>
              </div>

              <h3 className="text-2xl font-serif text-[#2a2a2a] mt-8 mb-4">
                What Can We Do Instead?
              </h3>

              <p className="text-lg">
                Instead of demanding stillness, we need to help children regulate their nervous systems. 
                This means co-regulation—using our own calm presence to help their nervous system 
                return to a state of safety.
              </p>

              <ul className="list-disc list-inside space-y-3 text-lg ml-4">
                <li>Movement breaks: Allow children to move their bodies before expecting stillness</li>
                <li>Deep pressure: Offer weighted blankets, tight hugs, or compression activities</li>
                <li>Rhythmic activities: Singing, rocking, or swaying can soothe the nervous system</li>
                <li>Connection first: Prioritize relationship and safety over compliance</li>
              </ul>

              <div className="my-12 bg-gradient-to-r from-[#e9e6dc] to-[#f5f3ed] p-8 rounded-2xl">
                <h4 className="text-xl font-serif text-[#2a2a2a] mb-4">Key Takeaway</h4>
                <p className="text-lg text-gray-700">
                  When we understand that behavior is communication from the nervous system, we shift 
                  from punishment to compassion. We move from "What's wrong with you?" to "What happened 
                  to you?" And in that shift, transformation becomes possible.
                </p>
              </div>

              <p className="text-lg">
                This is the work we do at Soul'Tales—teaching parents and educators to see behavior 
                through the lens of the nervous system, to respond with presence rather than punishment, 
                and to create spaces where children can learn to self-regulate because they first 
                experienced co-regulation.
              </p>
            </div>

            {/* Explore More Button */}
            <div className="mt-12 pt-8 border-t border-gray-200 text-center">
              <a
                href={latestBlog.mediumUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#2a2a2a] text-white rounded-full text-sm tracking-widest uppercase font-light hover:bg-[#c8886f] transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
              >
                Read Full Article on Medium
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* Category Filter & All Blogs */}
      <section className="relative py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Category Filter */}
          <div className="mb-12 flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full text-sm tracking-widest uppercase font-light transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-[#c8886f] text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-[#ebe8e0]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, index) => (
              <BlogCard key={blog.id} blog={blog} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Add Blog Modal */}
      {showAddBlogModal && (
        <AddBlogModal onClose={() => setShowAddBlogModal(false)} onAdd={(newBlog) => {
          setBlogs([newBlog, ...blogs]);
          setShowAddBlogModal(false);
        }} />
      )}

      {/* Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -30px) scale(1.1); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, 30px) scale(1.1); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float { animation: float 20s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 25s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out forwards; opacity: 0; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
      `}</style>
    </div>
  );
};

// Featured Blog Card Component
const FeaturedBlogCard = ({ blog, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } hover:-translate-y-2`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-xs tracking-widest uppercase text-[#2a2a2a] rounded-full">
            {blog.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-serif text-[#2a2a2a] mb-3 group-hover:text-[#c8886f] transition-colors duration-300">
          {blog.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {blog.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{blog.date}</span>
          <span>{blog.readTime}</span>
        </div>
      </div>
    </div>
  );
};

// Regular Blog Card Component
const BlogCard = ({ blog, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <a
      href={blog.mediumUrl}
      target="_blank"
      rel="noopener noreferrer"
      ref={cardRef}
      className={`group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } hover:-translate-y-2`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="text-xs tracking-widest uppercase text-[#c8886f] mb-2">
          {blog.category}
        </div>
        <h3 className="text-lg font-serif text-[#2a2a2a] mb-2 group-hover:text-[#c8886f] transition-colors duration-300">
          {blog.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
          {blog.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{blog.date}</span>
          <span>{blog.readTime}</span>
        </div>
      </div>
    </a>
  );
};

// Add Blog Modal Component
const AddBlogModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    category: "Young Soul'Tales",
    image: "",
    mediumUrl: "",
    readTime: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlog = {
      id: Date.now(),
      ...formData,
      author: "Preeti Sharma",
      date: new Date().toLocaleDateString("en-US", { 
        year: "numeric", 
        month: "long", 
        day: "numeric" 
      }),
      featured: false,
    };
    onAdd(newBlog);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-serif text-[#2a2a2a]">Add New Blog</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Blog Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c8886f] focus:border-transparent outline-none transition-all duration-200"
              placeholder="Enter blog title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt *
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c8886f] focus:border-transparent outline-none transition-all duration-200 resize-none"
              placeholder="Brief description of the blog"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c8886f] focus:border-transparent outline-none transition-all duration-200"
            >
              <option value="Young Soul'Tales">Young Soul'Tales</option>
              <option value="Soul'Tales">Soul'Tales</option>
              <option value="Kaifiyat">Kaifiyat</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL *
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c8886f] focus:border-transparent outline-none transition-all duration-200"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Medium Article URL *
            </label>
            <input
              type="url"
              name="mediumUrl"
              value={formData.mediumUrl}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c8886f] focus:border-transparent outline-none transition-all duration-200"
              placeholder="https://medium.com/@username/article-slug"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Read Time *
            </label>
            <input
              type="text"
              name="readTime"
              value={formData.readTime}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c8886f] focus:border-transparent outline-none transition-all duration-200"
              placeholder="e.g., 5 min read"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-[#c8886f] text-white rounded-full hover:bg-[#d4a574] transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Add Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
