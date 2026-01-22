"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { Rocket } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function ProjectsGrid() {
  const { t } = useI18n();

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            <span className="gradient-text">{t.projects.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-16 max-w-2xl">
            {t.projects.subtitle}
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div
            className="flex flex-col items-center justify-center py-24 px-6 rounded-2xl border"
            style={{
              background: 'linear-gradient(to bottom right, rgba(196,114,95,0.05), rgba(201,169,166,0.05), rgba(125,145,129,0.05))',
              borderColor: 'rgba(196,114,95,0.2)'
            }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
              style={{ background: 'linear-gradient(to bottom right, #C4725F, #7D9181)' }}
            >
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: '#C4725F' }}>
              {t.projects.comingSoon.title}
            </h3>
            <p className="text-muted-foreground text-center max-w-md">
              {t.projects.comingSoon.description}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
