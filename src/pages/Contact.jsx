import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const submitLockRef = useRef(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    if (!toast.show) return;

    const timer = setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3500);

    return () => clearTimeout(timer);
  }, [toast.show]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitLockRef.current) return;
    submitLockRef.current = true;

    setIsLoading(true);
    setSubmitStatus(null);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const publicKey =
      import.meta.env.VITE_EMAILJS_PUBLIC_TOKEN ||
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const adminTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const autoReplyTemplateId = import.meta.env
      .VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID;
    const adminRecipientEmail =
      import.meta.env.VITE_CONTACT_RECEIVER_EMAIL || "ghugeharshal7@gmail.com";

    const commonParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
    };

    const adminTemplateParams = {
      ...commonParams,
      to_email: adminRecipientEmail,
      email: adminRecipientEmail,
      recipient_email: adminRecipientEmail,
    };

    const autoReplyTemplateParams = {
      ...commonParams,
      to_email: formData.email,
      email: formData.email,
      recipient_email: formData.email,
    };

    try {
      if (!serviceId || !publicKey || !adminTemplateId) {
        throw new Error("Missing EmailJS configuration in .env");
      }

      await emailjs.send(
        serviceId,
        adminTemplateId,
        adminTemplateParams,
        publicKey,
      );

      if (autoReplyTemplateId && autoReplyTemplateId !== adminTemplateId) {
        if (!formData.email) {
          throw new Error("Recipient email is missing for auto-reply");
        }

        await emailjs.send(
          serviceId,
          autoReplyTemplateId,
          autoReplyTemplateParams,
          publicKey,
        );
      }

      setSubmitStatus("success");
      setToast({
        show: true,
        type: "success",
        message: "Message sent successfully. I will get back to you soon.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Email send error:", error);
      setSubmitStatus("error");
      setToast({
        show: true,
        type: "error",
        message: "Message failed to send. Please try again.",
      });
    } finally {
      submitLockRef.current = false;
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white mt-8">
      {toast.show && (
        <div
          role="alert"
          className={`fixed top-8 right-6 z-50 max-w-sm rounded-lg px-4 py-3 text-sm font-medium shadow-lg transition-all ${
            toast.type === "success"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {toast.message}
        </div>
      )}

      <section className="py-10 md:py-12 lg:py-14">
        <div className="mx-auto mt-8 max-w-7xl px-6 lg:px-12 lg:mt-12">

          {/* ─── DESKTOP LAYOUT (lg+): unchanged two-column grid ─── */}
          <div className="hidden lg:grid lg:grid-cols-2 lg:items-start lg:gap-0">

            {/* Left: Info column */}
            <div className="lg:pr-16 lg:pt-12 lg:border-r lg:border-stone-200">
              <p className="mb-6 text-xs font-medium uppercase tracking-[0.28em] text-[#a68866]">
                Get In Touch
              </p>

              <h1 className="max-w-md font-serif text-[5.5rem] font-light leading-[0.98] tracking-[-0.03em] text-stone-900">
                Let&apos;s
                <span className="mt-2 block italic text-[#a68866]">Connect</span>
              </h1>

              <div className="mt-8 h-px w-14 bg-[#a68866]" />

              <p className="mt-10 max-w-[36rem] text-[1.32rem] leading-[1.95] text-stone-500">
                Whether you&apos;re ready to begin or just have questions, I&apos;m
                here to listen and support you on your journey.
              </p>

              <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 text-stone-500">
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 text-[#a68866]">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 21s-6-4.35-6-10a6 6 0 1112 0c0 5.65-6 10-6 10z" />
                      <circle cx="12" cy="11" r="2.5" strokeWidth="1.8" />
                    </svg>
                  </span>
                  <p className="text-base">India</p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 text-[#a68866]">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16v12H4z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 7l8 6 8-6" />
                    </svg>
                  </span>
                  <p className="text-base">Responds within 24 hours</p>
                </div>
              </div>

              <div className="mt-14">
                <h3 className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-stone-600">
                  Follow Me
                </h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/youngsoultales"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 text-stone-500 transition-all hover:bg-stone-900 hover:text-white hover:border-stone-900"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/i-preeti/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 text-stone-500 transition-all hover:bg-stone-900 hover:text-white hover:border-stone-900"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Form card */}
            <div className="lg:pl-16">
              <div className="rounded-[40px] border border-stone-200 bg-white px-10 py-10 xl:px-14 xl:py-12 shadow-[0_24px_50px_rgba(29,23,10,0.20)]">
                <div className="mb-8 text-center">
                  <h2 className="font-serif text-4xl xl:text-5xl font-light text-stone-800 mb-3">
                    Get in Touch
                  </h2>
                  <p className="text-stone-500 text-base leading-relaxed mx-auto">
                    Fill out the form below and I&apos;ll get back to you within 24 hours.
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {submitStatus === "success" && (
                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl text-sm">
                      Thank you! Your message has been sent successfully. I'll get back to you soon.
                    </div>
                  )}
                  {submitStatus === "error" && (
                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl text-sm">
                      Oops! Something went wrong. Please try again or email me directly.
                    </div>
                  )}
                  {/* Name full width */}
                  <div>
                    <label htmlFor="name-desktop" className="block text-sm font-medium text-stone-600 mb-1.5">
                      Full Name <span className="text-stone-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name-desktop"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-stone-200 rounded-xl bg-stone-50 focus:bg-white focus:ring-2 focus:ring-stone-300 focus:border-transparent outline-none transition-all text-stone-800 placeholder:text-stone-400 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Your name"
                    />
                  </div>
                  {/* Email full width */}
                  <div>
                    <label htmlFor="email-desktop" className="block text-sm font-medium text-stone-600 mb-1.5">
                      Email Address <span className="text-stone-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email-desktop"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-stone-200 rounded-xl bg-stone-50 focus:bg-white focus:ring-2 focus:ring-stone-300 focus:border-transparent outline-none transition-all text-stone-800 placeholder:text-stone-400 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  {/* Phone + Subject side by side */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone-desktop" className="block text-sm font-medium text-stone-600 mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone-desktop"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="w-full px-4 py-3 border border-stone-200 rounded-xl bg-stone-50 focus:bg-white focus:ring-2 focus:ring-stone-300 focus:border-transparent outline-none transition-all text-stone-800 placeholder:text-stone-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject-desktop" className="block text-sm font-medium text-stone-600 mb-1.5">
                        Subject <span className="text-stone-400">*</span>
                      </label>
                      <select
                        id="subject-desktop"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        className="w-full px-4 py-3 border border-stone-200 rounded-xl bg-stone-50 focus:bg-white focus:ring-2 focus:ring-stone-300 focus:border-transparent outline-none transition-all text-stone-800 disabled:opacity-50 disabled:cursor-not-allowed appearance-none cursor-pointer"
                      >
                        <option value="">Select a subject</option>
                        <option value="therapy">Soul Tales</option>
                        <option value="movement">Young Soul</option>
                        <option value="consultation">Kaifiyat</option>
                        <option value="other">Other Inquiry</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message-desktop" className="block text-sm font-medium text-stone-600 mb-1.5">
                      Message <span className="text-stone-400">*</span>
                    </label>
                    <textarea
                      id="message-desktop"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      rows="4"
                      className="w-full px-4 py-3 border border-stone-200 rounded-xl bg-stone-50 focus:bg-white focus:ring-2 focus:ring-stone-300 focus:border-transparent outline-none transition-all resize-none text-stone-800 placeholder:text-stone-400 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Tell me a bit about what brings you here..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-stone-900 text-white py-4 px-8 rounded-xl font-medium text-base hover:bg-stone-700 active:scale-[0.99] transition-all duration-200 shadow-md hover:shadow-lg disabled:bg-stone-300 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* ─── MOBILE / TABLET LAYOUT (below lg) ─── */}
          <div className="lg:hidden">

            {/* Hero header — compact, left-aligned like top brands */}
            <div className="mb-10">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.28em] text-[#a68866]">
                Get In Touch
              </p>
              <h1 className="font-serif text-[3.5rem] sm:text-[4.25rem] font-light leading-[0.95] tracking-[-0.03em] text-stone-900">
                Let&apos;s
                <span className="mt-1 block italic text-[#a68866]">Connect</span>
              </h1>
              <div className="mt-5 h-px w-10 bg-[#a68866]" />
              <p className="mt-6 text-[1rem] sm:text-[1.15rem] leading-[1.9] text-stone-500 max-w-sm">
                Whether you&apos;re ready to begin or just have questions, I&apos;m
                here to listen and support you on your journey.
              </p>
            </div>

            {/* Form — clean, no card border on mobile, full-width */}
            <div className="bg-stone-50 rounded-2xl px-5 py-7 sm:px-7 sm:py-9 border border-stone-100">
              {/* No duplicate "Get in Touch" header here on mobile */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {submitStatus === "success" && (
                  <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl text-sm">
                    Thank you! Your message has been sent successfully. I'll get back to you soon.
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl text-sm">
                    Oops! Something went wrong. Please try again or email me directly.
                  </div>
                )}

                {/* Name */}
                <div>
                  <label htmlFor="name-mobile" className="block text-sm font-medium text-stone-600 mb-1.5">
                    Full Name <span className="text-stone-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name-mobile"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl bg-white focus:ring-2 focus:ring-stone-300 focus:border-transparent outline-none transition-all text-stone-800 placeholder:text-stone-400 text-base disabled:opacity-50"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email-mobile" className="block text-sm font-medium text-stone-600 mb-1.5">
                    Email Address <span className="text-stone-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email-mobile"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl bg-white focus:ring-2 focus:ring-stone-300 focus:border-transparent outline-none transition-all text-stone-800 placeholder:text-stone-400 text-base disabled:opacity-50"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Phone + Subject side by side on sm, stacked on xs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone-mobile" className="block text-sm font-medium text-stone-600 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone-mobile"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-stone-200 rounded-xl bg-white focus:ring-2 focus:ring-stone-300 focus:border-transparent outline-none transition-all text-stone-800 placeholder:text-stone-400 text-base disabled:opacity-50"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject-mobile" className="block text-sm font-medium text-stone-600 mb-1.5">
                      Subject <span className="text-stone-400">*</span>
                    </label>
                    <select
                      id="subject-mobile"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-stone-200 rounded-xl bg-white focus:ring-2 focus:ring-stone-300 focus:border-transparent outline-none transition-all text-stone-800 disabled:opacity-50 appearance-none cursor-pointer text-base"
                    >
                      <option value="">Select a subject</option>
                      <option value="therapy">Soul Tales</option>
                      <option value="movement">Young Soul</option>
                      <option value="consultation">Kaifiyat</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message-mobile" className="block text-sm font-medium text-stone-600 mb-1.5">
                    Message <span className="text-stone-400">*</span>
                  </label>
                  <textarea
                    id="message-mobile"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    rows="4"
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl bg-white focus:ring-2 focus:ring-stone-300 focus:border-transparent outline-none transition-all resize-none text-stone-800 placeholder:text-stone-400 text-base disabled:opacity-50"
                    placeholder="Tell me a bit about what brings you here..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-stone-900 text-white py-4 px-8 rounded-xl font-medium text-base hover:bg-stone-700 active:scale-[0.99] transition-all duration-200 disabled:bg-stone-300 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* ── Info strip below form on mobile — horizontal, minimal ── */}
            <div className="mt-8 pt-8 border-t border-stone-100">
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mb-7 text-stone-500">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-stone-200 text-[#a68866]">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 21s-6-4.35-6-10a6 6 0 1112 0c0 5.65-6 10-6 10z" />
                      <circle cx="12" cy="11" r="2.5" strokeWidth="1.8" />
                    </svg>
                  </span>
                  <p className="text-sm text-stone-600">India</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-stone-200 text-[#a68866]">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16v12H4z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 7l8 6 8-6" />
                    </svg>
                  </span>
                  <p className="text-sm text-stone-600">Responds within 24 hours</p>
                </div>
              </div>

              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-stone-500">Follow Me</p>
                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/youngsoultales"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-stone-500 transition-all hover:bg-stone-900 hover:text-white hover:border-stone-900"
                  >
                    <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/i-preeti/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-stone-500 transition-all hover:bg-stone-900 hover:text-white hover:border-stone-900"
                  >
                    <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

          </div>
          {/* ─── End mobile layout ─── */}

        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-stone-900/75"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 text-white">
          <h2 className="font-serif text-4xl lg:text-5xl font-light mb-6">
            Take the First Step
          </h2>
          <p className="text-xl text-stone-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            Your journey towards healing and self-discovery begins with a
            conversation. I'm here to walk alongside you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:preeti@example.com"
              className="inline-block px-10 py-4 bg-white text-stone-900 rounded-full font-medium text-lg hover:bg-stone-100 transition-all duration-300 shadow-xl"
            >
              Email Me
            </a>
            <a
              href="tel:+919876543210"
              className="inline-block px-10 py-4 border-2 border-white text-white rounded-full font-medium text-lg hover:bg-white hover:text-stone-900 transition-all duration-300"
            >
              Book Call
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};