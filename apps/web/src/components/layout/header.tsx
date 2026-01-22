"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";

export function Header() {
  const { t } = useI18n();
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { href: "#about", label: t.nav.about },
    { href: "#experience", label: t.nav.experience },
    { href: "#projects", label: t.nav.projects },
    { href: "#contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.slice(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-foreground/5">
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => scrollToSection("#home")}
          className="text-lg font-semibold tracking-tight hover:text-foreground/70 transition-colors"
        >
          Skylar Liang
        </button>

        <div className="flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => scrollToSection(item.href)}
                  className={cn(
                    "relative text-sm transition-colors",
                    activeSection === item.href.slice(1)
                      ? "opacity-100"
                      : "opacity-60 hover:opacity-100"
                  )}
                >
                  {item.label}
                  {activeSection === item.href.slice(1) && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-current"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
