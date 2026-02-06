// Header.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/global.css";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /* Header scroll behavior */
  useEffect(() => {
    if (mobileMenuOpen) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  /* Lock body scroll when menu open */
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
  }, [mobileMenuOpen]);

  return (
    < >
      {/* HEADER */}
      <header
        className={`absolute inset-x-0 z-1030 transition-all duration-300 ease-out  ${
          scrolled && !mobileMenuOpen
            ? "top-4"
            : "top-0"
            
        }`}
      >
        {/* HEADER CONTAINER */}
        <div
          className={`mx-auto w-[92%] lg:w-[80%] bg-transparent transition-all duration-300 ${
            scrolled && !mobileMenuOpen
              ? "bg-black backdrop-blur-md shadow-2xl rounded-full"
              : ""
          }`}
        >
          <div
            className={`px-6 lg:px-10 ${
              scrolled ? "py-2" : "py-4"
            }`}
          >
            <div className="flex items-center justify-between">
              {/* Logo */}
              <h1 className="text-white text-4xl md:text-6xl font-serif font-light">
                Preeti
              </h1>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex gap-8 text-l font-bold">
                {["HOME", "ABOUT", "WORK WITH ME", "BLOG", "CONTACT"].map(
                  (item) => {
                    const path =
                      item === "HOME"
                        ? "/"
                        : `/${item.toLowerCase().replace(/ /g, "-")}`;
                    return (
                      <Link key={item} to={path} className="nav-link">
                        {item}
                      </Link>
                    );
                  }
                )}
                <Link
                  to="/get-started"
                  className="border px-6 py-1 rounded-full text-white border-white hover:bg-white hover:text-black transition"
                >
                  GET STARTED
                </Link>
              </nav>

              {/* Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden z-[1100]"
              >
                <div className="space-y-1.5">
                  <span
                    className={`block w-7 h-0.5 bg-white transition ${
                      mobileMenuOpen && "rotate-45 translate-y-2"
                    }`}
                  />
                  <span
                    className={`block w-7 h-0.5 bg-white transition ${
                      mobileMenuOpen && "opacity-0"
                    }`}
                  />
                  <span
                    className={`block w-7 h-0.5 bg-white transition ${
                      mobileMenuOpen && "-rotate-45 -translate-y-2"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE FULLSCREEN MENU */}
    
      <div
        className={`fixed inset-0 z-[1020] bg-black/10 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)]
        ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-10 pointer-events-none"
        }`}
      >
        <nav className="h-full flex flex-col items-center justify-center  space-y-8 text-white text-lg tracking-widest">
          {["HOME", "ABOUT", "WORK WITH ME", "BLOG", "CONTACT"].map((item) => {
            const path =
              item === "HOME"
                ? "/"
                : `/${item.toLowerCase().replace(/ /g, "-")}`;
            return (
              <Link
                key={item}
                to={path}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:opacity-70 transition"
              >
                {item}
              </Link>
            );
          })}

          <Link
            to="/get-started"
            onClick={() => setMobileMenuOpen(false)}
            className="border px-10 py-3 rounded-full hover:bg-white hover:text-black transition mt-6"
          >
            GET STARTED
          </Link>
        </nav>
      </div>
    </>
  );
};

export {Header};
export default Header;
