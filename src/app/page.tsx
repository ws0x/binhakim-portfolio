import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import LiveProjects from "../components/LiveProjects";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Education from "../components/Education";
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
        <LiveProjects />
        <Experience />
        <Projects />
        <Education />
        <Blog />
        <Contact />
      </main>
    </>
  );
}
