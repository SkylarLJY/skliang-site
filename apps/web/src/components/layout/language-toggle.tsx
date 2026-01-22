"use client";

import { useI18n } from "@/lib/i18n";

export function LanguageToggle() {
  const { locale, setLocale } = useI18n();

  return (
    <button
      onClick={() => setLocale(locale === "en" ? "fr" : "en")}
      className="text-sm font-medium opacity-60 hover:opacity-100 transition-opacity"
      aria-label="Toggle language"
    >
      {locale === "en" ? "FR" : "EN"}
    </button>
  );
}
