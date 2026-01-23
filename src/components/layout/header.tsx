"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { LanguageToggle } from "./language-toggle";

export function Header() {
  const { t } = useI18n();
  const [activeSection, setActiveSection] = useState("home");

  const navItems = useMemo(
    () => [
      { href: "#about", label: t.nav.about, color: "#7CB342", emoji: "🥬" },
      { href: "#experience", label: t.nav.experience, color: "#E53935", emoji: "🍅" },
      { href: "#projects", label: t.nav.projects, color: "#FFC107", emoji: "🧀" },
      { href: "#contact", label: t.nav.contact, color: "#C4956C", emoji: "🍞" },
    ],
    [t.nav.about, t.nav.experience, t.nav.projects, t.nav.contact]
  );

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", ...navItems.map((item) => item.href.slice(1))];
      const headerHeight = 56; // h-14 = 56px

      // Find which section is currently most visible
      let currentSection = "home";

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Section is active if its top is at or above the header
          if (rect.top <= headerHeight + 50) {
            currentSection = sectionId;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const scrollToSection = (href: string) => {
    const sectionId = href.slice(1);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 56; // h-14 = 56px
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: sectionId === "home" ? 0 : offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b"
      style={{
        background: 'linear-gradient(180deg, rgba(160, 110, 60, 0.97) 0%, rgba(185, 135, 85, 0.97) 100%)',
        borderColor: 'rgba(120, 80, 40, 0.4)',
      }}
    >
      <nav className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <motion.button
          onClick={() => scrollToSection("#home")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-base font-semibold tracking-tight transition-colors flex items-center gap-2"
          style={{ color: '#FFFAF5', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
        >
          <span className="text-lg">{t.emoji}</span>
          <span>Skylar Liang</span>
        </motion.button>

        <div className="flex items-center gap-4">
          <ul className="hidden sm:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <li key={item.href}>
                  <motion.button
                    onClick={() => scrollToSection(item.href)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "relative text-xs font-medium transition-all px-3 py-1.5 rounded-full",
                      isActive ? "text-white" : "text-white/80 hover:text-white"
                    )}
                    style={{
                      background: isActive ? item.color : 'transparent',
                      boxShadow: isActive ? `0 2px 8px ${item.color}40` : 'none',
                    }}
                  >
                    <span className="mr-1">{item.emoji}</span>
                    {item.label}
                  </motion.button>
                </li>
              );
            })}
          </ul>
          <LanguageToggle />
        </div>
      </nav>
    </header>
  );
}
