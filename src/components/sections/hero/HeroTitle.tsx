"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { heroTitle } from "./content";
import { hero } from "./tokens";

const displayStyle: CSSProperties = {
  color: "#FEF5E2",
  fontFamily: "var(--font-display)",
  fontWeight: 400,
  fontStyle: "normal",
  lineHeight: hero.titleDisplayLineHeight,
  textTransform: "uppercase",
};

const sansStyle: CSSProperties = {
  color: "#FEF5E2",
  fontFamily: "var(--font-body)",
  fontWeight: 400,
  fontStyle: "normal",
  lineHeight: hero.titleSansLineHeight,
  letterSpacing: hero.titleSansTracking,
  textTransform: "uppercase",
};

export function HeroTitle() {
  return (
    <motion.div
      className="relative z-10 mx-auto flex w-full max-w-[90rem] flex-col items-center px-5 text-center lg:px-[var(--hero-pad-x)]"
      style={{ "--hero-pad-x": hero.padX } as CSSProperties}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <h1 className="mx-auto flex w-fit flex-col items-center lg:items-start">
        <span className="flex flex-wrap items-baseline justify-center gap-x-[1rem] lg:justify-start">
          {heroTitle.line1.map((part) => (
            <span
              key={part.text}
              className={
                part.tone === "display"
                  ? "text-[2.75rem] lg:text-[5rem]"
                  : "text-[1.75rem] lg:text-[3.5rem]"
              }
              style={part.tone === "display" ? displayStyle : sansStyle}
            >
              {part.text}
            </span>
          ))}
        </span>
        <span className="mt-[0.8125rem] flex flex-wrap items-baseline justify-center gap-x-[1rem] lg:ml-[5.21875rem] lg:justify-start">
          {heroTitle.line2.map((part) => (
            <span
              key={part.text}
              className={
                part.tone === "display"
                  ? "text-[2.75rem] lg:text-[5rem]"
                  : "text-[1.75rem] lg:text-[3.5rem]"
              }
              style={part.tone === "display" ? displayStyle : sansStyle}
            >
              {part.text}
            </span>
          ))}
        </span>
      </h1>
    </motion.div>
  );
}
