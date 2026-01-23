"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const technologies = [
  ["React", "TypeScript", "Java", "AWS"],
  ["JavaScript", "Python", "PostgreSQL"],
];

export function ExperienceTimeline() {
  const { t } = useI18n();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="experience"
      className="relative sticky top-4"
      style={{
        zIndex: 3,
      }}
    >
      
      <motion.div
        initial={prefersReducedMotion ? false : { y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
        className="relative w-full overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,120,100,0.25) 0%, transparent 70%),
            linear-gradient(180deg, #E54D42 0%, #D94038 50%, #CC3630 100%)
          `,
        }}
      >
        {/* Tomato emojis scattered in background */}
        {[
          { x: '2%', y: '10%', size: 40 },
          { x: '90%', y: '15%', size: 36 },
          { x: '85%', y: '70%', size: 38 },
          { x: '5%', y: '65%', size: 34 },
          { x: '75%', y: '40%', size: 32 },
          { x: '12%', y: '40%', size: 30 },
        ].map((tomato, i) => (
          <motion.span
            key={`tomato-${i}`}
            animate={prefersReducedMotion ? {} : {
              y: [0, -6, 0],
              rotate: [0, 5, 0],
            }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
            className="absolute pointer-events-none select-none"
            style={{
              left: tomato.x,
              top: tomato.y,
              fontSize: tomato.size,
              opacity: 0.5,
            }}
          >
            🍅
          </motion.span>
        ))}

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-8 md:py-10">
          {/* Section Title */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="text-2xl">🍅</span>
            <h2
              className="text-xl md:text-2xl font-bold text-white"
              style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}
            >
              {t.experience.title}
            </h2>
          </motion.div>

          {/* Experience Cards */}
          <div className="space-y-4">
            {t.experience.jobs.map((exp, index) => (
              <motion.div
                key={index}
                initial={prefersReducedMotion ? false : { y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: [0.22, 0.61, 0.36, 1] }}
                className="rounded-2xl p-5 md:p-6"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>
                      {exp.role}
                    </h3>
                    <p className="text-white/90 font-medium text-sm">{exp.company}</p>
                  </div>
                  <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-white/25 text-white self-start">
                    {exp.period}
                  </span>
                </div>
                <p className="text-white/90 text-sm leading-relaxed mb-3">
                  {exp.description}
                </p>
                {technologies[index] && (
                  <div className="flex flex-wrap gap-2">
                    {technologies[index].map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-3 py-1 rounded-full font-medium bg-white/20 text-white border border-white/25"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

          </section>
  );
}
