import Footer from "@/components/Footer";
import ScrollingText from "@/components/ScrollingText";
import About from "@/sections/About";
import Contact from "@/sections/Contact";
import Hero from "@/sections/Hero";
import Projects from "@/sections/Projects";
import Skills from "@/sections/Skills";

export default function Home() {
  return (
    <>
      <Hero />
      <ScrollingText />
      <About />
      <Projects />
      <Skills />
      <ScrollingText />
      <Contact />
      <Footer />
    </>
  );
}
