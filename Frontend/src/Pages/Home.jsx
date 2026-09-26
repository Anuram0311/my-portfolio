import Navbar from '../Components/Navbar';
import Hero from '../Sections/Hero';
import About from '../Sections/About';
import Skills from '../Sections/Skills';
import Experience from '../Sections/Experience';
import Projects from '../Sections/Projects';
import Contact from '../Sections/Contact';
import CustomCursor from '../Components/CustomCursor';
import Footer from '../Components/Footer';

export default function Home() {
  return (
    <main className="bg-brand-dark min-h-screen">
      <CustomCursor />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
