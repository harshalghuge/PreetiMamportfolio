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
        "https://script.google.com/macros/s/AKfycbzHf-YnTfZVQI1hUfk1xdYMLtRKN2STUCYCopauMOhApe86UOsad7MAAJkbYyYFMG9g/exec",
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
    <section className="bg-[#fbf8f1] py-32">
      <div className="max-w-6xl mx-auto px-6 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20  items-center ml-0 lg:ml-30">
          {/* LEFT CONTENT */}
          <div className="text-center  max-w-xl mx-auto  flex-col justify-center items-center  ">
            <p className="text-l tracking-widest uppercase mb-6">
              Before You Go
            </p>

            <h2 className="font-serif text-5xl leading-tight mb-6 uppercase">
              Something for the journey
            </h2>

            <p className="text-sx leading-relaxed mb-10 text-black/70">
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
                className="mt-4 inline-block border border-black px-6 py-2 text-sm tracking-wide uppercase hover:bg-black hover:text-white transition rounded-2xl"
              >
                Submit
              </button>
            </form>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center mx-auto w-[250px] h-[420px] overflow-hidden  lg:ml-20">
           
              <img
                src="./images/IMG10.jpeg"
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
