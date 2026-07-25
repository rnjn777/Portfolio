import LoadingScreen from "@/components/ui/LoadingScreen";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import dynamic from 'next/dynamic';

const About = dynamic(() => import('@/components/sections/About'));
const Experience = dynamic(() => import('@/components/sections/Experience'));
const Projects = dynamic(() => import('@/components/sections/Projects'));
const TechStack = dynamic(() => import('@/components/sections/TechStack'));
const Achievements = dynamic(() => import('@/components/sections/Achievements'));
const Github = dynamic(() => import('@/components/sections/Github'));
const Contact = dynamic(() => import('@/components/sections/Contact'));
const Footer = dynamic(() => import('@/components/sections/Footer'));

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Experience />
        <TechStack />
        <Projects />
        <Achievements />
        <Github />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
