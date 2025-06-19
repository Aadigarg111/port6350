"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { FaEnvelope, FaPhone, FaClock } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";
import { toast, Toaster } from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const recaptchaRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get reCAPTCHA token
    const recaptchaToken = recaptchaRef.current?.getValue();

    if (!recaptchaToken) {
      toast.error("Please complete the reCAPTCHA verification.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(
          data.message ||
            "Message sent successfully! I'll get back to you soon."
        );

        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });

        // Reset reCAPTCHA
        recaptchaRef.current?.reset();
      } else {
        toast.error(
          data.message || "Failed to send message. Please try again."
        );
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error(
        "Something went wrong. Please try again or contact me directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="w-full py-16 bg-white dark:bg-black text-black dark:text-white"
    >
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: "var(--toast-bg, #333)",
            color: "var(--toast-color, #fff)",
            border: "1px solid var(--toast-border, #555)",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
        <h2 className="text-4xl md:text-7xl lg:text-9xl font-head font-bold text-white my-4 md:my-8 lg:my-10">
          Get In Touch
        </h2>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
          {/* Left: Contact Form */}
          <div className="order-2 xl:order-1">
            <div className="bg-white dark:bg-zinc-900 border border-gray-300 dark:border-gray-700 p-6 md:p-8 lg:p-10 rounded-xl shadow-md h-fit sticky top-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      className="block text-sm font-semibold mb-2"
                      htmlFor="name"
                    >
                      Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      disabled={isSubmitting}
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Your Full Name"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-semibold mb-2"
                      htmlFor="email"
                    >
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      disabled={isSubmitting}
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Your Email Address"
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm font-semibold mb-2"
                    htmlFor="subject"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    disabled={isSubmitting}
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-semibold mb-2"
                    htmlFor="message"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows="6"
                    required
                    disabled={isSubmitting}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all resize-vertical disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Tell us a bit about your project or inquiry"
                  />
                </div>

                {/* reCAPTCHA */}
                <div className="flex justify-center">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    theme="dark" // Change to "light" if you prefer
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-label="Send message"
                  className="w-full py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-lg hover:opacity-90 transition-all duration-200 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right: Image + Info */}
          <div className="order-1 xl:order-2 space-y-6 md:space-y-8">
            <div className="w-full h-56 md:h-72 lg:h-80 xl:h-96 relative rounded-xl overflow-hidden shadow-lg border border-gray-300 dark:border-gray-700">
              <Image
                src="/setup.webp"
                alt="Contact"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
                className="object-cover rounded-xl"
              />
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="p-4 md:p-6 border border-gray-300 dark:border-gray-700 rounded-lg flex items-center gap-3 md:gap-4 hover:shadow-md transition-shadow duration-300">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                  <FaEnvelope className="text-white text-sm md:text-base" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm md:text-base mb-1">
                    Email Me
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm break-all">
                    swayamcoder@gmail.com
                  </p>
                </div>
              </div>

              <div className="p-4 md:p-6 border border-gray-300 dark:border-gray-700 rounded-lg flex items-center gap-3 md:gap-4 hover:shadow-md transition-shadow duration-300">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                  <FaPhone className="text-white text-sm md:text-base" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm md:text-base mb-1">
                    Call Me
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    +91 63713 52331
                  </p>
                </div>
              </div>

              <div className="p-4 md:p-6 border border-gray-300 dark:border-gray-700 rounded-lg flex items-start gap-3 md:gap-4 hover:shadow-md transition-shadow duration-300">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                  <FaClock className="text-white text-sm md:text-base" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm md:text-base mb-1">
                    Response Time
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Fast replies are my thing, usually within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
