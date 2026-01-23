"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Rocket } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function ProjectsGrid() {
  const { t } = useI18n();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="projects"
      className="relative sticky top-8"
      style={{
        zIndex: 4,
      }}
    >
      <motion.div
        initial={prefersReducedMotion ? false : { y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
        className="relative w-full overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #FDCB5C 0%, #F5B041 50%, #E59832 100%)',
        }}
      >
        {/* Cheese holes scattered across */}
        {[
          { x: '5%', y: '15%', size: 35 },
          { x: '85%', y: '10%', size: 28 },
          { x: '92%', y: '55%', size: 22 },
          { x: '8%', y: '70%', size: 25 },
          { x: '45%', y: '20%', size: 18 },
          { x: '70%', y: '75%', size: 30 },
          { x: '25%', y: '45%', size: 20 },
          { x: '60%', y: '40%', size: 15 },
        ].map((hole, i) => (
          <motion.div
            key={i}
            animate={prefersReducedMotion ? {} : { scale: [1, 1.03, 1] }}
            transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: hole.x,
              top: hole.y,
              width: hole.size,
              height: hole.size,
              background: 'radial-gradient(circle at 35% 35%, rgba(220,200,130,0.3) 0%, rgba(200,180,110,0.5) 60%, rgba(180,160,90,0.45) 100%)',
              boxShadow: 'inset 1px 1px 4px rgba(0,0,0,0.1), inset -1px -1px 3px rgba(255,255,255,0.15)',
            }}
          />
        ))}

        {/* Shine effect */}
        {!prefersReducedMotion && (
          <motion.div
            animate={{ opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.35) 0%, transparent 40%, rgba(255,255,255,0.1) 100%)',
            }}
          />
        )}

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
            <span className="text-2xl">🧀</span>
            <h2
              className="text-xl md:text-2xl font-bold"
              style={{ color: '#6B5220', textShadow: '0 1px 2px rgba(255,255,255,0.3)' }}
            >
              {t.projects.title}
            </h2>
          </motion.div>

          {/* Coming Soon Card */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-2xl p-6 md:p-8 text-center"
            style={{
              background: 'rgba(255,255,255,0.25)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.3)',
            }}
          >
            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, -4, 0], rotate: [0, 2, -2, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto"
              style={{ background: 'linear-gradient(to bottom right, #8B7355, #6B5220)' }}
            >
              <Rocket className="w-7 h-7 text-white" />
            </motion.div>
            <h3
              className="text-lg md:text-xl font-bold mb-2"
              style={{ color: '#6B5220' }}
            >
              {t.projects.comingSoon.title}
            </h3>
            <p className="max-w-md mx-auto text-sm md:text-base" style={{ color: '#7A6530' }}>
              {t.projects.comingSoon.description}
            </p>
          </motion.div>
        </div>
      </motion.div>

          </section>
  );
}
