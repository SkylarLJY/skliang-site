"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";

type Locale = "en" | "fr";

const translations = { en, fr } as const;

type TranslationKeys = typeof en;

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationKeys;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale;
    if (saved && (saved === "en" || saved === "fr")) {
      setLocale(saved);
    }
  }, []);

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  return (
    <I18nContext.Provider
      value={{
        locale,
        setLocale: handleSetLocale,
        t: translations[locale],
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
