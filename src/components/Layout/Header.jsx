// Header.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/global.css"; // Import global.css

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed z-[1030] transition-all duration-400 ${
        scrolled
          ? "top-4 left-1/2 -translate-x-1/2 w-[92%] lg:w-[80%] bg-black/40 backdrop-blur-md shadow-2xl rounded-full"
          : "top-0 left-0 w-full bg-transparent"
      }`}
    >
      <div
        className={`max-w-[1400px] mx-auto px-6 lg:px-10 transition-all duration-300 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="flex items-center justify-between text-center">
          {/* Logo */}
          <div className="logo pb-1">
            <h1
              className={`font-sans text-white tracking-wide transition-all duration-300 ${
                scrolled ? "text-3xl md:text-4xl" : "text-4xl md:text-6xl"
              }`}
            >
              Preeti
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden font-sans text-[12px] font-bold italic lg:flex items-center space-x-6 xl:space-x-10 gap-4">
            <Link to="/" className="nav-link">
              HOME
            </Link>
            <Link to="/about" className="nav-link">
              ABOUT
            </Link>
            <Link to="/work" className="nav-link">
              WORK WITH ME
            </Link>
            <Link to="/blog" className="nav-link">
              BLOG
            </Link>
            <Link to="/contact" className="nav-link">
              CONTACT
            </Link>

            <Link
              to="/get-started"
              className="border text-[12.8px] text-white px-6 mb-1 py-1 rounded-full tracking-widest hover:bg-white hover:text-black transition-all duration-300"
            >
              GET STARTED
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex flex-col space-y-1.5 z-50"
            aria-label="Toggle menu"
          >
            <span
              className={`w-7 h-0.5 bg-white transition-all duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`w-7 h-0.5 bg-white transition-all duration-300 ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`w-7 h-0.5 bg-white transition-all duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/98 backdrop-blur-lg transition-all duration-300 ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } top-[80px]`}
      >
        <nav className="flex flex-col items-center justify-center h-full space-y-8">
          <a
            href="#home"
            className="text-white text-lg tracking-widest hover:text-gray-300 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            HOME
          </a>
          <a
            href="#about"
            className="text-white text-lg tracking-widest hover:text-gray-300 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            ABOUT
          </a>
          <a
            href="#work"
            className="text-white text-lg tracking-widest hover:text-gray-300 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            WORK WITH ME
          </a>
          <a
            href="#contact"
            className="text-white text-lg tracking-widest hover:text-gray-300 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            CONTACT
          </a>
          <a
            href="#bonus"
            className="text-white text-lg tracking-widest hover:text-gray-300 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            BONUS PAGES
          </a>
          <button
            className="border border-white text-white px-10 py-3 rounded-full text-sm tracking-widest hover:bg-white hover:text-black transition-all duration-300 mt-4"
            onClick={() => setMobileMenuOpen(false)}
          >
            GET STARTED
          </button>
        </nav>
      </div>
    </header>
  );
};

export { Header };
export default Header;
