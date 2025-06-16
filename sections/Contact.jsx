"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaEnvelope, FaPhone, FaClock } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Integrate with API or service like EmailJS, Formspree, etc.
    console.log("Form submitted:", formData);
    alert("Message sent successfully!");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section
      id="contact"
      className="w-full py-16 bg-white dark:bg-black text-black dark:text-white"
    >
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
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
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
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
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
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
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
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all resize-vertical"
                    placeholder="Tell us a bit about your project or inquiry"
                  />
                </div>

                <button
                  type="submit"
                  aria-label="Send message"
                  className="w-full py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-lg hover:opacity-90 transition-all duration-200 text-lg"
                >
                  Send Message
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
