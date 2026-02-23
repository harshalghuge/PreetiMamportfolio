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
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY; // ← Tries both
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

      // 1. Send email to YOU (admin notification)
      await emailjs.send(
        serviceId,
        adminTemplateId,
        adminTemplateParams,
        publicKey,
      );

      // 2. Send auto-reply to USER (confirmation)
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
    <div className="bg-white">
      {toast.show && (
        <div
          role="alert"
          className={`fixed top-6 right-6 z-50 max-w-sm rounded-lg px-4 py-3 text-sm font-medium shadow-lg transition-all ${
            toast.type === "success"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {toast.message}
        </div>
      )}
      {/* Hero Section - Fixed Background */}
      <section className="relative h-[380px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed "
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-stone-900/60 "></div>
        </div>

        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light mb-6">
            Let's Connect
          </h1>
          <p className="text-xl md:text-2xl font-light leading-relaxed">
            Whether you're ready to begin or just have questions, I'm here to
            listen and support you on your journey.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Left - Contact Form */}
            <div>
              <h2 className="font-serif text-4xl lg:text-5xl font-light text-stone-800 mb-4">
                Get in Touch
              </h2>
              <p className="text-stone-600 text-lg mb-8 leading-relaxed">
                Fill out the form below and I'll get back to you within 24
                hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Success Message */}
                {submitStatus === "success" && (
                  <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                    Thank you! Your message has been sent successfully. I'll get
                    back to you soon.
                  </div>
                )}

                {/* Error Message */}
                {submitStatus === "error" && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                    Oops! Something went wrong. Please try again or email me
                    directly.
                  </div>
                )}

                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-stone-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-400 focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-stone-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-400 focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-stone-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-400 focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="+91 98765 43210"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-stone-700 mb-2"
                  >
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-400 focus:border-transparent outline-none transition-all bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">Select a subject</option>
                    <option value="therapy">Soul Tales</option>
                    <option value="movement">Young Soul</option>
                    <option value="consultation">Kaifiyat</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-stone-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    rows="6"
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-400 focus:border-transparent outline-none transition-all resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Tell me a bit about what brings you here..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-stone-900 text-white py-4 px-8 rounded-lg font-medium text-lg hover:bg-stone-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:bg-stone-400 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* Right - Contact Information */}
            <div className="lg:pl-8">
              <h2 className="font-serif text-4xl lg:text-5xl font-light text-stone-800 mb-8">
                Contact Information
              </h2>

              {/* Contact Cards */}
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start space-x-4 p-6 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors">
                  <div className="w-12 h-12 bg-stone-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-800 mb-1">Email</h3>
                    <a
                      href="mailto:preeti@example.com"
                      className="text-stone-600 hover:text-stone-900 transition-colors"
                    >
                      preeti@example.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4 p-6 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors">
                  <div className="w-12 h-12 bg-stone-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-800 mb-1">Phone</h3>
                    <a
                      href="tel:+919876543210"
                      className="text-stone-600 hover:text-stone-900 transition-colors"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start space-x-4 p-6 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors">
                  <div className="w-12 h-12 bg-stone-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-800 mb-1">
                      Location
                    </h3>
                    <p className="text-stone-600">
                      Pune, Maharashtra
                      <br />
                      India
                    </p>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-start space-x-4 p-6 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors">
                  <div className="w-12 h-12 bg-stone-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-800 mb-1">
                      Office Hours
                    </h3>
                    <p className="text-stone-600">
                      Mon - Fri: 10:00 AM - 6:00 PM
                      <br />
                      Sat: 10:00 AM - 2:00 PM
                      <br />
                      Sun: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-12">
                <h3 className="font-semibold text-stone-800 mb-4">Follow Me</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-10 h-10 bg-stone-200 rounded-full flex items-center justify-center hover:bg-stone-900 hover:text-white transition-all"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-stone-200 rounded-full flex items-center justify-center hover:bg-stone-900 hover:text-white transition-all"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-stone-200 rounded-full flex items-center justify-center hover:bg-stone-900 hover:text-white transition-all"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 lg:py-32 bg-stone-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <h2 className="font-serif text-4xl lg:text-5xl font-light text-stone-800 text-center mb-16">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-stone-800 mb-3">
                How long is a typical session?
              </h3>
              <p className="text-stone-600 leading-relaxed">
                Individual therapy sessions typically last 50-60 minutes.
                Movement therapy sessions may run 75-90 minutes depending on the
                approach.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-stone-800 mb-3">
                Do you offer online sessions?
              </h3>
              <p className="text-stone-600 leading-relaxed">
                Yes, I offer secure video sessions for clients who prefer remote
                therapy or cannot visit in person.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-stone-800 mb-3">
                What should I expect in the first session?
              </h3>
              <p className="text-stone-600 leading-relaxed">
                The first session is about getting to know each other,
                understanding what brings you to therapy, and discussing your
                goals and expectations.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-stone-800 mb-3">
                Is therapy confidential?
              </h3>
              <p className="text-stone-600 leading-relaxed">
                Absolutely. Everything discussed in our sessions is completely
                confidential, with only a few legal exceptions which I'll
                explain during our first meeting.
              </p>
            </div>
          </div>
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
