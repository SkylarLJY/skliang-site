"use client";

import { FadeIn } from "@/components/animations/fade-in";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/animations/stagger-children";
import { useI18n } from "@/lib/i18n";

const technologies = [
  ["React", "TypeScript", "Java", "AWS"],
  ["JavaScript", "Python", "PostgreSQL"],
];

export function ExperienceTimeline() {
  const { t } = useI18n();

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            <span className="gradient-text">{t.experience.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-16 max-w-2xl">
            {t.experience.subtitle}
          </p>
        </FadeIn>

        <StaggerChildren className="relative">
          <div
            className="absolute left-0 top-0 bottom-0 w-px hidden md:block"
            style={{ background: 'linear-gradient(to bottom, #C4725F, #C9A9A6, #7D9181)' }}
          />

          {t.experience.jobs.map((exp, index) => (
            <StaggerItem key={index}>
              <div className="relative pl-0 md:pl-8 pb-12 last:pb-0">
                <div
                  className="absolute left-0 top-2 w-3 h-3 rounded-full hidden md:block -translate-x-[5px]"
                  style={{ background: index === 0 ? '#C4725F' : '#7D9181' }}
                />

                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                  <div className="md:w-32 shrink-0">
                    <p className="text-sm font-mono font-medium text-purple">
                      {exp.period}
                    </p>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1">{exp.role}</h3>
                    <p className="text-muted-foreground mb-3">{exp.company}</p>
                    <p className="text-foreground/80 leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {technologies[index] && (
                      <div className="flex flex-wrap gap-2">
                        {technologies[index].map((tech, techIndex) => {
                          const colors = [
                            { bg: 'rgba(196,114,95,0.15)', text: '#C4725F' },
                            { bg: 'rgba(125,145,129,0.15)', text: '#7D9181' },
                            { bg: 'rgba(201,169,166,0.15)', text: '#C9A9A6' },
                            { bg: 'rgba(139,115,85,0.15)', text: '#8B7355' },
                          ];
                          const color = colors[techIndex % 4];
                          return (
                            <span
                              key={tech}
                              className="text-xs px-3 py-1 rounded-full font-medium"
                              style={{ background: color.bg, color: color.text }}
                            >
                              {tech}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
