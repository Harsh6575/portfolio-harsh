import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
// import Experience from './components/Experience';
import Tech from './components/Tech';
import Contact from './components/Contact';
import Projects from './components/Projects';

export default function Home() {
  return (
    <div className="relative z-0 bg-primary">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Hero />
      </div>
      <About />
      {/* <Experience /> */}
      <Tech />
      <Projects />
      <Contact />
      {/* <Feedbacks />
      <div className="relative z-0">
        <Contact />
        <StarsCanvas />
      </div> */}
    </div>
  );
}
