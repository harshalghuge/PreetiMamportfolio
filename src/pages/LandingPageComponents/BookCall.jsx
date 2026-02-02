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
            "https://script.google.com/macros/s/AKfycbwdLRHadxMD026bjoPSc5PSgius5PER327uLd9Umf-9MvLnc-envN1fko4PluC5JIQwLQ/exec",
            {
                method: "POST",
                // 2. IMPORTANT: Remove the Content-Type header. 
                // Let the browser handle it for a simple form-data POST.
                // headers: {
                //   "Content-Type": "text/plain", // <--- DELETE THIS LINE
                // },
                body: params, // 3. Use the URLSearchParams object
                
                // Optional: You can also try:
                // headers: { "Content-Type": "application/x-www-form-urlencoded" },
                // body: params.toString(), 
                // But often removing the header entirely works best for simple POSTs.
            }
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
            alert(`Error submitting form: ${data.message || 'Unknown error'}`);
        }
    } catch (err) {
        alert("Server error or failed to parse response.");
        console.error(err);
    }
};

  return (
    <section className="bg-[#fbf8f1] py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* LEFT CONTENT */}
          <div className="text-center lg:text-left max-w-xl mx-auto lg:mx-0">
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

            <form onSubmit={handleSubmit} className="max-w-md w-full space-y-6">
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
                className="mt-4 inline-block border border-black px-6 py-2 text-sm tracking-wide uppercase hover:bg-black hover:text-white transition"
              >
                Submit
              </button>
            </form>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-[250px] h-[380px] overflow-hidden rounded-[60%]">
              <img
                src="https://images.squarespace-cdn.com/content/v1/6533c4b5460fb876e598d099/46c095f7-8e54-4a8f-934a-48a0a0530510/camille-brodard-0X1Ic-4YEgI-unsplash.jpg"
                alt="Final CTA visual"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
