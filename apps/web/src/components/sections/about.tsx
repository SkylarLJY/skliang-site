"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { useI18n } from "@/lib/i18n";

export function About() {
  const { t } = useI18n();

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            <span className="gradient-text">{t.about.title}</span>
          </h2>
          <div className="text-lg text-muted-foreground max-w-2xl space-y-4">
            <p>{t.about.content}</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
