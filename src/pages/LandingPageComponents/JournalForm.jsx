import React, { useState } from "react";

const FinalCTA = () => {
  // form submission handling
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Convert the form state into URL-encoded parameters
    const params = new URLSearchParams();
    for (const key in form) {
      params.append(key, form[key]);
    }

    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbwsjcDAOUdL6JnP7A7OetozzJxXakozq2W2QHJNacZmhB3KZsmyfUwRYCcKNRU1EOZa/exec",
        {
          method: "POST",

          body: params, // 3. Use the URLSearchParams object
        },
      );

      // Apps Script returns a text response, so we need to read it as text,
      // then parse the JSON manually if you return JSON from Apps Script.
      // If your Apps Script returns a simple success message, you might need to adjust this part.
      const text = await res.text();
      const data = JSON.parse(text);

      if (data.status === "success") {
        alert("Form submitted successfully");
        setForm({ name: "", email: "" });
      } else {
        alert(`Error submitting form: ${data.message || "Unknown error"}`);
      }
    } catch (err) {
      alert("Server error or failed to parse response.");
      console.error(err);
    }
  };

  return (
    <section className="overflow-x-clip bg-[#fbf8f1] py-16 sm:py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,36rem)_minmax(0,16rem)] lg:items-center lg:justify-center lg:gap-32 xl:gap-80">
          {/* LEFT CONTENT */}
          <div className="mx-auto w-full max-w-xl text-center">
            <p className="mb-4 text-sm tracking-[0.2em] uppercase sm:mb-6">
              Before You Go
            </p>

            <h2 className="mb-4 font-serif text-3xl leading-tight uppercase sm:mb-6 sm:text-4xl lg:text-5xl">
              Something for the journey
            </h2>

            <p className="mb-8 text-sm leading-relaxed text-black/70 sm:mb-10 sm:text-base">
              The Rerooting Journal is a 7-day guided journey back to yourself.
              Not advice. Not affirmations. Just questions that help you
              remember who you were before the world told you who to be.
            </p>

            <form
              onSubmit={handleSubmit}
              className="max-w-md w-full space-y-6 mx-auto"
            >
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border-b border-gray-400 bg-transparent py-2 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:border-black transition"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border-b border-gray-400 bg-transparent py-2 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:border-black transition"
              />

              <button
                type="submit"
                className="mt-4 inline-block rounded-2xl border border-black px-6 py-2 text-sm tracking-wide uppercase transition hover:bg-black hover:text-white"
              >
                Submit
              </button>
            </form>
          </div>

          {/* RIGHT IMAGE */}
          <div className="mx-auto flex h-[340px] w-[220px] justify-center overflow-hidden sm:h-[420px] sm:w-[250px]">
           
              <img
                src="/images/IMG10_50.webp"
                alt="Final CTA visual"
                loading="lazy"
                className="w-full h-full object-cover rounded-[60%]"
              />
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
