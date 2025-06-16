"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Image1 from "@/public/image1.jpeg";
import Image2 from "@/public/image2.jpeg";
import Image3 from "@/public/image3.jpg";

// Image array
const IMAGES = [
  { id: 1, image: Image1, alt: "Swayam Swarup Panda - Butterfly" },
  { id: 2, image: Image2, alt: "Swayam Swarup Panda - Beach Cave" },
  { id: 3, image: Image3, alt: "Swayam Swarup Panda - Desert Tree" },
];

// Reusable motion config
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const About = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -250]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative bg-black text-white w-full pt-16"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Column */}
          <div className="space-y-8 order-1">
            <motion.div {...fadeUp}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-head font-bold my-4 md:my-8 lg:mt-0">
                Hi, I'm Swayam
              </h1>
            </motion.div>

            <motion.p
              className="text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed"
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              A frontend developer focused on building fast, accessible, and
              intelligent web interfaces using Next.js and React. I combine
              clean design with cutting-edge technology to create seamless,
              business-driven digital experiences.
            </motion.p>

            <motion.a
              href="#contact"
              aria-label="Contact Me"
              className="inline-block px-6 py-3 bg-white text-black font-semibold rounded-lg shadow hover:bg-gray-200 transition duration-300"
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
          </div>

          {/* Image Column */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[700px] order-2">
            {/* Mobile - Center Image */}
            <motion.div
              {...fadeUp}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-96 md:hidden z-10"
            >
              <Image
                src={IMAGES[1].image}
                alt={IMAGES[1].alt}
                fill
                sizes="(max-width: 768px) 80vw"
                className="object-cover rounded-lg shadow-2xl"
              />
            </motion.div>

            {/* Desktop - Butterfly */}
            <motion.div
              style={{ y: y1 }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="hidden md:block absolute bottom-0 left-[80px] lg:bottom-[40px] lg:left-0 w-36 h-48 z-30"
            >
              <Image
                src={IMAGES[0].image}
                alt={IMAGES[0].alt}
                fill
                sizes="(min-width: 768px) 144px"
                className="object-cover rounded-lg shadow-2xl"
              />
            </motion.div>

            {/* Desktop - Beach Cave */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="hidden md:block absolute bottom-[60px] left-1/2 lg:left-[280px] lg:bottom-[100px] transform -translate-x-1/2 w-80 h-96 z-10"
            >
              <Image
                src={IMAGES[1].image}
                alt={IMAGES[1].alt}
                fill
                sizes="(min-width: 768px) 320px"
                className="object-cover rounded-lg shadow-2xl"
              />
            </motion.div>

            {/* Desktop - Desert Tree */}
            <motion.div
              style={{ y: y2 }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="hidden md:block absolute bottom-[120px] right-[70px] lg:bottom-[180px] lg:right-0 w-52 h-64 z-20"
            >
              <Image
                src={IMAGES[2].image}
                alt={IMAGES[2].alt}
                fill
                sizes="(min-width: 768px) 208px"
                className="object-cover rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
