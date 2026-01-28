import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer } from "./components/Layout";
import Header from "./components/Layout/Header.jsx";

import Home from "./pages/Home";
import MainSection from "./pages/MainSection";
import { About } from "./pages/About";
import WorkTogether from "./pages/WorkTogether.jsx";
import { Blog } from "./pages/Blog.jsx";
import BookCall from "./pages/LandingPageComponents/BookCall.jsx";
import LandingBlog from "./pages/LandingPageComponents/LandingBlog.jsx";

import "./styles/global.css";

function App() {
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
                <BookCall />
              </>
            }
          />

          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/work-with-me" element={<WorkTogether />} />
          <Route path="/book-call" element={<BookCall />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
