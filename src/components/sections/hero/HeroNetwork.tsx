"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { networkIntro, networkItems } from "./content";
import { hero } from "./tokens";

const ease = [0.22, 1, 0.36, 1] as const;

const networkLabelStyle: CSSProperties = {
  color: hero.networkLabelColor,
  fontFamily: "var(--font-body)",
  fontSize: hero.networkLabelSize,
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: 1.5,
  letterSpacing: hero.networkLabelTracking,
  textTransform: "uppercase",
};

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.22,
      staggerChildren: 0.1,
    },
  },
};

const introVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

export function HeroNetwork() {
  return (
    <motion.div
      className="relative z-10 mx-auto mt-[1.25rem] w-full max-w-[90rem] px-5 lg:mt-[1.5rem] lg:px-[var(--hero-pad-x)]"
      style={{ "--hero-pad-x": hero.padX } as CSSProperties}
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <div className="mx-auto flex w-full max-w-[59.5rem] flex-col items-stretch gap-[1rem] lg:flex-row lg:items-center lg:gap-[1.5rem]">
        <motion.div
          className="shrink-0 text-center lg:w-[12.5rem] lg:text-left"
          variants={introVariants}
        >
          <p className="font-sans font-medium uppercase" style={networkLabelStyle}>
            {networkIntro.eyebrow}
          </p>
          <p className="mt-[0.25rem] font-[family-name:var(--font-display)] text-[1.5rem] uppercase leading-[1.25] text-bronze lg:text-[2rem]">
            {networkIntro.title}
          </p>
        </motion.div>

        {/* Mobile: 2-col, last centered. Desktop: row with dividers */}
        <ul className="grid w-full grid-cols-2 gap-x-[1rem] gap-y-[1.25rem] lg:flex lg:flex-1 lg:items-start lg:justify-between lg:gap-0">
          {networkItems.map((item, i) => {
            const isLast = i === networkItems.length - 1;
            return (
              <motion.li
                key={item.lines.join("-")}
                variants={itemVariants}
                className={`flex flex-col items-center gap-[0.5rem] text-center lg:flex-1 lg:px-[0.75rem] ${
                  i > 0 ? "lg:border-l lg:border-[#6B3F24]/40" : ""
                } ${
                  isLast
                    ? "col-span-2 w-[7.125rem] justify-self-center lg:col-auto lg:w-auto"
                    : "w-full"
                }`}
              >
                <Image
                  src={item.icon}
                  alt=""
                  width={32}
                  height={32}
                  className="object-contain"
                  style={{ width: hero.networkIcon, height: hero.networkIcon }}
                  aria-hidden
                />
                <span
                  className="flex h-[3rem] w-[7.125rem] flex-col justify-start"
                  style={networkLabelStyle}
                  aria-label={item.lines.join(" ")}
                >
                  <span className="block whitespace-nowrap leading-[1.5]">
                    {item.lines[0]}
                  </span>
                  <span className="block whitespace-nowrap leading-[1.5]">
                    {item.lines[1]}
                  </span>
                </span>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </motion.div>
  );
}
