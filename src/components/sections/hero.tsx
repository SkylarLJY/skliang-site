"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Mail } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const socialLinks = [
  { href: "https://github.com/SkylarLJY", icon: GithubIcon, label: "GitHub" },
  { href: "https://linkedin.com/in/skylar-liang", icon: LinkedinIcon, label: "LinkedIn" },
  { href: "mailto:skylarliang233@gmail.com", icon: Mail, label: "Email" },
];

export function Hero() {
  const { t } = useI18n();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative sticky top-0"
      style={{ zIndex: 1 }}
    >
      <motion.div
        initial={prefersReducedMotion ? false : { y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        className="relative w-full overflow-hidden"
        style={{
          background: `linear-gradient(
            180deg,
            #D9C098 0%,
            #E8D4B0 30%,
            #F2E4C8 60%,
            #E8D4B0 100%
          )`,
        }}
      >
        {/* Bread texture - porous air pockets */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 25px 20px at 8% 15%, rgba(200,165,115,0.5) 0%, transparent 70%),
              radial-gradient(ellipse 35px 28px at 25% 10%, rgba(190,155,105,0.4) 0%, transparent 65%),
              radial-gradient(ellipse 30px 24px at 48% 18%, rgba(195,160,110,0.45) 0%, transparent 68%),
              radial-gradient(ellipse 40px 32px at 72% 12%, rgba(185,150,100,0.35) 0%, transparent 60%),
              radial-gradient(ellipse 22px 18px at 92% 20%, rgba(200,165,115,0.5) 0%, transparent 70%),
              radial-gradient(ellipse 28px 22px at 5% 45%, rgba(190,155,105,0.45) 0%, transparent 68%),
              radial-gradient(ellipse 38px 30px at 20% 50%, rgba(180,145,95,0.35) 0%, transparent 55%),
              radial-gradient(ellipse 32px 26px at 42% 48%, rgba(195,160,110,0.4) 0%, transparent 65%),
              radial-gradient(ellipse 35px 28px at 65% 45%, rgba(185,150,100,0.35) 0%, transparent 60%),
              radial-gradient(ellipse 25px 20px at 88% 52%, rgba(200,165,115,0.45) 0%, transparent 70%),
              radial-gradient(ellipse 30px 24px at 12% 78%, rgba(190,155,105,0.4) 0%, transparent 62%),
              radial-gradient(ellipse 35px 28px at 35% 82%, rgba(185,150,100,0.35) 0%, transparent 58%),
              radial-gradient(ellipse 40px 32px at 58% 80%, rgba(195,160,110,0.3) 0%, transparent 55%),
              radial-gradient(ellipse 28px 22px at 82% 85%, rgba(200,165,115,0.42) 0%, transparent 68%)
            `,
          }}
        />

        {/* Warm center glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,250,240,0.4) 0%, transparent 70%)',
          }}
        />

        {/* Subtle shine sweep */}
        {!prefersReducedMotion && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 3.5, delay: 1.5, repeat: Infinity, repeatDelay: 12 }}
            className="absolute inset-0 pointer-events-none overflow-hidden"
          >
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,252,245,0.2) 50%, transparent 100%)',
                transform: 'skewX(-15deg)',
              }}
            />
          </motion.div>
        )}

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-20 pb-16 md:pt-24 md:pb-24">
          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-2"
            style={{ color: '#6B4423' }}
          >
            {t.hero.name}
          </motion.h1>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl font-bold mb-4"
            style={{ color: '#8B5A2B' }}
          >
            {t.hero.tagline}
          </motion.p>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-sm md:text-base max-w-xl mb-6 leading-relaxed"
            style={{ color: '#8B6B4F' }}
          >
            {t.hero.description}
          </motion.p>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((link, index) => {
              const hoverColors = ["var(--color-tomato)", "var(--color-lettuce)", "var(--color-cheese)"];
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: 3 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                  className="p-2 rounded-full transition-colors duration-300"
                  style={{
                    color: '#6B4423',
                    background: 'rgba(255,255,255,0.5)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = hoverColors[index])}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#6B4423')}
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5" />
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </motion.div>

          </section>
  );
}
