"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Layer types for visual styling variations
 */
type LayerType = "bread" | "lettuce" | "tomato" | "cheese" | "default";

/**
 * Overlap amount presets
 */
type OverlapSize = "none" | "sm" | "md" | "lg";

interface SandwichLayerProps {
  children: ReactNode;
  /** Type of ingredient - affects shadow/highlight styling */
  layerType?: LayerType;
  /** Amount of vertical overlap with previous section */
  overlap?: OverlapSize;
  /** Stack order (higher = on top) */
  zIndex?: number;
  /** Enable slight rotation during enter animation for organic feel */
  withRotation?: boolean;
  /** Initial rotation angle in degrees (alternates positive/negative) */
  rotationAngle?: number;
  /** Animation delay in seconds */
  delay?: number;
  /** Custom className for the outer wrapper */
  className?: string;
  /** Custom className for the content wrapper */
  contentClassName?: string;
  /** Viewport margin for triggering animation (default: "-80px") */
  viewportMargin?: string;
}

/**
 * Creates the "placing" animation variants with customizable parameters
 */
function createPlacingVariants(
  rotation: number,
  reducedMotion: boolean
): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 1, y: 0, rotate: 0 },
      visible: { opacity: 1, y: 0, rotate: 0 },
    };
  }

  return {
    hidden: {
      opacity: 0,
      y: 60,
      rotate: rotation,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        duration: 0.55,
        // Custom "settle" easing - starts fast, decelerates smoothly
        // This creates the "gentle placement" feel
        ease: [0.22, 0.61, 0.36, 1],
      },
    },
  };
}

/**
 * Maps overlap size to CSS custom property value
 */
const overlapMap: Record<OverlapSize, string> = {
  none: "0px",
  sm: "var(--layer-overlap-sm)",
  md: "var(--layer-overlap-md)",
  lg: "var(--layer-overlap-lg)",
};

/**
 * SandwichLayer
 *
 * A section wrapper that creates the stacked sandwich layer effect.
 *
 * Features:
 * - Consistent vertical overlap between sections
 * - Subtle top-edge shadows for depth (no heavy card shadows)
 * - Scroll-triggered "placing" animation
 * - Reduced motion support
 * - Mobile-responsive overlap values
 *
 * Usage:
 * ```tsx
 * <SandwichLayer layerType="lettuce" overlap="md" zIndex={2}>
 *   <YourSectionContent />
 * </SandwichLayer>
 * ```
 */
export function SandwichLayer({
  children,
  layerType = "default",
  overlap = "md",
  zIndex = 1,
  withRotation = false,
  rotationAngle = 1,
  delay = 0,
  className,
  contentClassName,
  viewportMargin = "-80px",
}: SandwichLayerProps) {
  const prefersReducedMotion = useReducedMotion();

  const variants = createPlacingVariants(
    withRotation ? rotationAngle : 0,
    prefersReducedMotion ?? false
  );

  return (
    <motion.div
      className={cn(
        "sandwich-layer",
        overlap !== "none" && "sandwich-layer--overlap",
        `sandwich-layer--${layerType}`,
        className
      )}
      style={{
        "--layer-index": zIndex,
        "--layer-overlap": overlapMap[overlap],
      } as React.CSSProperties}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: viewportMargin }}
      variants={variants}
      transition={{ delay }}
    >
      <div
        className={cn(
          "sandwich-layer__content",
          layerType === "lettuce" && "sandwich-layer__content--wavy",
          (layerType === "tomato" || layerType === "cheese") &&
            "sandwich-layer__content--curved",
          contentClassName
        )}
      >
        {children}
      </div>
    </motion.div>
  );
}

/**
 * CSS-only fallback for environments without Framer Motion
 * Uses IntersectionObserver + CSS classes
 */
export function SandwichLayerCSS({
  children,
  layerType = "default",
  overlap = "md",
  zIndex = 1,
  withRotation = false,
  className,
  contentClassName,
  threshold = 0.1,
}: Omit<SandwichLayerProps, "delay" | "rotationAngle" | "viewportMargin"> & {
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only trigger once
        }
      },
      { threshold, rootMargin: "-80px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={cn(
        "sandwich-layer",
        "sandwich-layer--animated",
        overlap !== "none" && "sandwich-layer--overlap",
        `sandwich-layer--${layerType}`,
        withRotation && "has-rotation",
        isVisible && "is-visible",
        className
      )}
      style={{
        "--layer-index": zIndex,
        "--layer-overlap": overlapMap[overlap],
      } as React.CSSProperties}
    >
      <div
        className={cn(
          "sandwich-layer__content",
          layerType === "lettuce" && "sandwich-layer__content--wavy",
          (layerType === "tomato" || layerType === "cheese") &&
            "sandwich-layer__content--curved",
          contentClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
