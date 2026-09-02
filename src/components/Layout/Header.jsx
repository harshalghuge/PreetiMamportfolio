// Header.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/global.css";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isDarkTextPage =
    location.pathname.startsWith("/blog") ||
    location.pathname.startsWith("/contact");

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
    <>
      {/* HEADER */}
      {/* HEADER */}
      <header
        className={`fixed z-[1030] transition-all duration-500 ease-out ${
          scrolled && !mobileMenuOpen
            ? "top-4 left-1/2 -translate-x-1/2 w-[70%] lg:w-[62%]"
            : "top-0 left-0 w-full"
        }`}
      >
        {/* HEADER CONTAINER */}
        <div
          className={`mx-auto transition-all duration-500 ${
            scrolled && !mobileMenuOpen
              ? "bg-black/40 backdrop-blur-md shadow-2xl rounded-full "
              : "bg-transparent lg:px-20"
          }`}
        >
          <div
            className={`px-6 lg:px-10 transition-all duration-500 ${
              scrolled ? "py-2" : "py-4"
            }`}
          >
            <div className="flex items-center justify-between">
              {/* Logo */}
              <h1
                className={`font-serif font-light transition-all duration-500 ${
                  scrolled ? "text-3xl md:text-4xl" : "text-4xl md:text-6xl"
                } ${
                  scrolled
                    ? "text-white"
                    : isDarkTextPage
                      ? "text-black"
                      : "text-white"
                }`}
              >
                Preeti
              </h1>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex gap-8 text-l font-bold">
                {["HOME", "ABOUT", "BLOG", "WORK WITH ME", "CONTACT"].map(
                  (item) => {
                    const path =
                      item === "HOME"
                        ? "/"
                        : `/${item.toLowerCase().replace(/ /g, "-")}`;

                    return (
                      <Link
                        key={item}
                        to={path}
                        className={`nav-link ${
                          scrolled
                            ? "!text-white after:!bg-white"
                            : isDarkTextPage
                              ? "!text-black after:!bg-black"
                              : "!text-white after:!bg-white"
                        }`}
                      >
                        {item}
                      </Link>
                    );
                  },
                )}
              </nav>

              {/* Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden z-[1100]"
              >
                <div className="space-y-1.5">
                  <span
                    className={`block w-7 h-0.5 transition ${
                      scrolled
                        ? "bg-white"
                        : isDarkTextPage
                          ? "bg-black"
                          : "bg-white"
                    } ${mobileMenuOpen && "rotate-45 translate-y-2"}`}
                  />

                  <span
                    className={`block w-7 h-0.5 transition ${
                      scrolled
                        ? "bg-white"
                        : isDarkTextPage
                          ? "bg-black"
                          : "bg-white"
                    } ${mobileMenuOpen && "opacity-0"}`}
                  />

                  <span
                    className={`block w-7 h-0.5 transition ${
                      scrolled
                        ? "bg-white"
                        : isDarkTextPage
                          ? "bg-black"
                          : "bg-white"
                    } ${mobileMenuOpen && "-rotate-45 -translate-y-2"}`}
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
          {["HOME", "ABOUT", "BLOG", "WORK WITH ME", "CONTACT"].map((item) => {
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

export { Header };
export default Header;
