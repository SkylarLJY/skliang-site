"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const { t } = useI18n();
  const [status, setStatus] = useState<FormStatus>("idle");
  const prefersReducedMotion = useReducedMotion();

  const contactSchema = z.object({
    name: z.string().min(2, t.contact.validation.nameMin),
    email: z.string().email(t.contact.validation.emailInvalid),
    message: z.string().min(10, t.contact.validation.messageMin),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact`
          : "/api/v1/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) throw new Error("Failed to send message");

      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section
      id="contact"
      className="relative sticky top-12"
      style={{
        zIndex: 5,
      }}
    >
      
      <motion.div
        initial={prefersReducedMotion ? false : { y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1], delay: 0.1 }}
        className="relative w-full overflow-hidden"
        style={{
          background: `linear-gradient(
            0deg,
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
            whileInView={{ x: "200%" }}
            viewport={{ once: true }}
            transition={{ duration: 3.5, delay: 1 }}
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
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-8 md:py-10">
          {/* Section Title */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="text-2xl">{t.breadEmoji}</span>
            <h2
              className="text-xl md:text-2xl font-bold"
              style={{ color: '#6B4423', textShadow: '0 1px 2px rgba(255,255,255,0.2)' }}
            >
              {t.contact.title}
            </h2>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-2xl p-5 md:p-6"
            style={{
              background: 'rgba(255,255,255,0.35)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.4)',
            }}
          >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: '#6B4423' }}
                >
                  {t.contact.form.name}
                </label>
                <input
                  {...register("name")}
                  type="text"
                  id="name"
                  className={cn(
                    "w-full px-4 py-2.5 rounded-xl border-2 transition-all duration-300",
                    "focus:outline-none focus:ring-2 focus:ring-offset-1",
                    errors.name ? "border-red-400" : "border-transparent hover:border-white/50"
                  )}
                  style={{
                    background: 'rgba(255,255,255,0.7)',
                    color: '#6B4423',
                  }}
                  placeholder={t.contact.form.namePlaceholder}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: '#6B4423' }}
                >
                  {t.contact.form.email}
                </label>
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  className={cn(
                    "w-full px-4 py-2.5 rounded-xl border-2 transition-all duration-300",
                    "focus:outline-none focus:ring-2 focus:ring-offset-1",
                    errors.email ? "border-red-400" : "border-transparent hover:border-white/50"
                  )}
                  style={{
                    background: 'rgba(255,255,255,0.7)',
                    color: '#6B4423',
                  }}
                  placeholder={t.contact.form.emailPlaceholder}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-1.5"
                style={{ color: '#6B4423' }}
              >
                {t.contact.form.message}
              </label>
              <textarea
                {...register("message")}
                id="message"
                rows={4}
                className={cn(
                  "w-full px-4 py-2.5 rounded-xl border-2 transition-all duration-300 resize-none",
                  "focus:outline-none focus:ring-2 focus:ring-offset-1",
                  errors.message ? "border-red-400" : "border-transparent hover:border-white/50"
                )}
                style={{
                  background: 'rgba(255,255,255,0.7)',
                  color: '#6B4423',
                }}
                placeholder={t.contact.form.messagePlaceholder}
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={status === "loading"}
              whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              className={cn(
                "flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 rounded-xl font-medium transition-all duration-300 text-white",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
              style={{
                background: '#6B4423',
                boxShadow: '0 4px 15px rgba(107, 68, 35, 0.3)',
              }}
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t.contact.form.sending}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {t.contact.form.send}
                </>
              )}
            </motion.button>

            <AnimatePresence mode="wait">
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2"
                  style={{ color: 'var(--color-lettuce-dark)' }}
                >
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium text-sm">{t.contact.form.success}</span>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2"
                  style={{ color: 'var(--color-tomato)' }}
                >
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium text-sm">{t.contact.form.error}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
          </motion.div>

          {/* Sandwich complete message */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            className="text-center mt-8"
          >
            <span className="text-4xl">{t.emoji}</span>
            <p className="text-sm font-medium mt-2" style={{ color: '#8B6B4F' }}>
              {t.contact.complete}
            </p>
          </motion.div>
        </div>
      </motion.div>

          </section>
  );
}
