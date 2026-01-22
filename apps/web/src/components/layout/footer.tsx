"use client";

import { Github, Linkedin, Mail } from "lucide-react";

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

export function Footer() {
  const hoverColors = ['#C4725F', '#7D9181', '#C9A9A6'];

  return (
    <footer className="border-t border-foreground/5 py-12 mt-32 bg-[#FAF8F5] dark:bg-[#1F1D1B]">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {new Date().getFullYear()} <span className="gradient-text font-medium">Skylar Liang</span>
        </p>

        <div className="flex items-center gap-4">
          {socialLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-300 hover:scale-110 text-muted-foreground"
              onMouseEnter={(e) => e.currentTarget.style.color = hoverColors[index]}
              onMouseLeave={(e) => e.currentTarget.style.color = ''}
              aria-label={link.label}
            >
              <link.icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
