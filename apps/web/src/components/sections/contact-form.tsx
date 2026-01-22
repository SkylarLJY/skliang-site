"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/animations/fade-in";
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
    <section id="contact" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            <span className="gradient-text">{t.contact.title}</span> 👋
          </h2>
          <p className="text-lg text-muted-foreground mb-16 max-w-2xl">
            {t.contact.subtitle}
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-xl space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                {t.contact.form.name}
              </label>
              <input
                {...register("name")}
                type="text"
                id="name"
                className={cn(
                  "w-full px-4 py-3 rounded-xl border bg-background transition-all duration-300",
                  "focus:outline-none focus:ring-2 focus:ring-purple/50 focus:border-purple",
                  errors.name
                    ? "border-red-500"
                    : "border-foreground/10 hover:border-purple/50"
                )}
                placeholder={t.contact.form.namePlaceholder}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                {t.contact.form.email}
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                className={cn(
                  "w-full px-4 py-3 rounded-xl border bg-background transition-all duration-300",
                  "focus:outline-none focus:ring-2 focus:ring-purple/50 focus:border-purple",
                  errors.email
                    ? "border-red-500"
                    : "border-foreground/10 hover:border-purple/50"
                )}
                placeholder={t.contact.form.emailPlaceholder}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
              >
                {t.contact.form.message}
              </label>
              <textarea
                {...register("message")}
                id="message"
                rows={5}
                className={cn(
                  "w-full px-4 py-3 rounded-xl border bg-background transition-all duration-300 resize-none",
                  "focus:outline-none focus:ring-2 focus:ring-purple/50 focus:border-purple",
                  errors.message
                    ? "border-red-500"
                    : "border-foreground/10 hover:border-purple/50"
                )}
                placeholder={t.contact.form.messagePlaceholder}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.message.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className={cn(
                "flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 rounded-xl font-medium transition-all duration-300 text-white",
                "hover:shadow-lg hover:scale-[1.02]",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              )}
              style={{
                background:
                  "linear-gradient(to right, #C4725F, #C9A9A6, #7D9181)",
                boxShadow: "none",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 10px 25px -5px rgba(196,114,95,0.4)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
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
            </button>

            <AnimatePresence mode="wait">
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 text-green-600 dark:text-green-400"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>{t.contact.form.success}</span>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 text-red-600 dark:text-red-400"
                >
                  <AlertCircle className="w-5 h-5" />
                  <span>{t.contact.form.error}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
