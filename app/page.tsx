import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProjectsSection from "./components/ProjectsSection";
import Contact from "./components/Contact";
import About from "./components/About";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      {/* Main wrapper centers all content vertically and horizontally */}
      <main className="flex min-h-screen items-center justify-center pt-20">
        <div className="w-full max-w-5xl px-6 flex flex-col items-center text-center gap-16">
          <Hero />
          <ProjectsSection />
          <About />
          <Contact />
          
        </div>
      </main>
    </div>
  );
}
