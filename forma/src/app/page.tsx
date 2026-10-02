import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import ScrollWorld from "@/components/ScrollWorld";
import Services from "@/components/Services";

export default function Home() {
  return (
    <>
      {/* The walkthrough's fixed layers sit underneath; the rest of the page slides up over them. */}
      <ScrollWorld />
      <div className="relative z-[70] bg-paper">
        <main>
          <About />
          <Projects />
          <Services />
          <Process />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
