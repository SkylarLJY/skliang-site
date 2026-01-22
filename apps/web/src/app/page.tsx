import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { ProjectsGrid } from "@/components/sections/projects-grid";
import { ContactForm } from "@/components/sections/contact-form";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ExperienceTimeline />
      <ProjectsGrid />
      <ContactForm />
    </>
  );
}
