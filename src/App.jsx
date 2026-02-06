import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, Footer } from "./components/Layout";

import Home from "./pages/Home";
import { About } from "./pages/About";
import MainSection  from "./pages/LandingPageComponents/MainSection.jsx";
import WorkTogether from "./pages/LandingPageComponents/WorkTogether.jsx";
import { Blog } from "./pages/Blog.jsx";
import JournalForm from "./pages/LandingPageComponents/JournalForm.jsx";
import LandingBlog from "./pages/LandingPageComponents/LandingBlog.jsx";

import "./styles/global.css";
import { useEffect } from "react";

function App() {

  useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".fade-up").forEach((el) => {
    observer.observe(el);
  });

  return () => observer.disconnect();
}, []);

  return (
    <BrowserRouter>
      <Header />
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
                <MainSection />
                <WorkTogether />
                {/* <Blog /> */}
                <LandingBlog />
                <JournalForm />
              </>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/work-with-me" element={<WorkTogether />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
