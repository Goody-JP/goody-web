"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
} & Omit<HTMLMotionProps<"div">, "children">;

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  once = true,
  ...rest
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type MaskRevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "span" | "div";
};

export function MaskReveal({
  children,
  delay = 0,
  className = "",
  as = "span",
}: MaskRevealProps) {
  const Tag = as === "div" ? motion.div : motion.span;
  return (
    <span
      className={`inline-block overflow-hidden align-bottom ${className}`}
      style={{ verticalAlign: "bottom" }}
    >
      <Tag
        initial={{ y: "110%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-5% 0px -5% 0px" }}
        transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block"
      >
        {children}
      </Tag>
    </span>
  );
}
