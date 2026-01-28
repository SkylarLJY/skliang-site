import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { ProjectsGrid } from "@/components/sections/projects-grid";
import { ContactForm } from "@/components/sections/contact-form";

export default function Home() {
  return (
    <div className="relative">
      {/* Background - cutting board / plate aesthetic */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: 'linear-gradient(180deg, var(--color-background) 0%, #F0EBE3 50%, var(--color-background) 100%)',
        }}
      />

      {/* Top bread slice */}
      <Hero />

      {/* Sandwich filling - centered layers */}
      <div className="relative">
        <About />
        <ExperienceTimeline />
        <ProjectsGrid />
        {/* Bottom bread slice */}
        <ContactForm />
      </div>
    </div>
  );
}
