"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export function About() {
  const { t } = useI18n();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="relative sticky top-0"
      style={{
        zIndex: 2,
      }}
    >
      
      <motion.div
        initial={prefersReducedMotion ? false : { y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
        className="relative w-full overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #7BC043 0%, #6BAF3A 50%, #5A9E30 100%)',
        }}
      >
        {/* Lettuce emojis scattered in background */}
        {[
          { x: '3%', y: '12%', size: 38 },
          { x: '88%', y: '10%', size: 34 },
          { x: '85%', y: '65%', size: 36 },
          { x: '6%', y: '60%', size: 32 },
          { x: '72%', y: '35%', size: 30 },
          { x: '15%', y: '38%', size: 28 },
        ].map((lettuce, i) => (
          <motion.span
            key={`lettuce-${i}`}
            animate={prefersReducedMotion ? {} : {
              y: [0, -5, 0],
              rotate: [0, -5, 0],
            }}
            transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, delay: i * 0.25 }}
            className="absolute pointer-events-none select-none"
            style={{
              left: lettuce.x,
              top: lettuce.y,
              fontSize: lettuce.size,
              opacity: 0.5,
            }}
          >
            🥬
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
            <span className="text-2xl">🥬</span>
            <h2
              className="text-xl md:text-2xl font-bold text-white"
              style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}
            >
              {t.about.title}
            </h2>
          </motion.div>

          {/* Main Content Card */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-2xl p-5 md:p-6 mb-4"
            style={{
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <p
              className="text-white text-sm md:text-base leading-relaxed"
              style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
            >
              {t.about.content}
            </p>
          </motion.div>

          {/* Interests Tags */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            {t.about.interests?.map((interest: string, index: number) => (
              <motion.span
                key={interest}
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
                className="px-3 py-1.5 rounded-full text-xs md:text-sm font-medium cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.25)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.3)',
                  textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                }}
              >
                {interest}
              </motion.span>
            ))}
          </motion.div>
        </div>

      </motion.div>

          </section>
  );
}
