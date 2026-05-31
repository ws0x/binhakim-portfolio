import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import LiveProjects from "../components/LiveProjects";
import Blog from "../components/Blog";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <LiveProjects />
        <Blog />
        <Contact />
      </main>
    </>
  );
}
