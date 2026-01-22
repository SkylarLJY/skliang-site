"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const socialLinks = [
  {
    href: "https://github.com/skylarliang",
    icon: Github,
    label: "GitHub",
  },
  {
    href: "https://linkedin.com/in/skylarliang",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    href: "mailto:hello@skylarliang.com",
    icon: Mail,
    label: "Email",
  },
];

export function Hero() {
  const { t } = useI18n();

  return (
    <section
      id="home"
      className="min-h-[calc(100vh-4rem)] flex flex-col justify-center px-6 relative"
    >
      <div className="max-w-5xl mx-auto w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-muted-foreground text-lg mb-4"
        >
          {t.hero.greeting}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 pb-2 gradient-text"
        >
          {t.hero.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-lg text-muted-foreground max-w-xl mb-12 leading-relaxed"
        >
          {t.hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center gap-6"
        >
          {socialLinks.map((link, index) => {
            const hoverColors = ["#C4725F", "#7D9181", "#C9A9A6"];
            return (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 p-2 -m-2 hover:scale-110 text-muted-foreground"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = hoverColors[index])
                }
                onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                aria-label={link.label}
              >
                <link.icon className="w-6 h-6" />
              </a>
            );
          })}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}
