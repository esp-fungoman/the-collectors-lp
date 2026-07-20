"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { networkIntro, networkItems } from "./content";
import { hero } from "./tokens";

const ease = [0.22, 1, 0.36, 1] as const;

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
      className="relative z-10 mx-auto mt-[2rem] w-full max-w-[90rem] px-5 [--net-label:0.875rem] [--net-icon:1.75rem] [--net-item-w:6.5rem] md:mt-[8rem] md:[--net-label:0.875rem] md:[--net-icon:1.75rem] md:[--net-item-w:6.75rem] lg:mt-[1.5rem] lg:px-[var(--hero-pad-x)] lg:[--net-label:1rem] lg:[--net-icon:2rem] lg:[--net-item-w:7.125rem]"
      style={{ "--hero-pad-x": hero.padX } as CSSProperties}
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <div className="mx-auto flex w-full max-w-[59.5rem] flex-col items-stretch gap-[1rem] md:flex-row md:items-center md:gap-[0.75rem] lg:gap-[1.5rem]">
        <motion.div
          className="shrink-0 text-center md:w-[12rem] md:text-left lg:w-[12.5rem]"
          variants={introVariants}
        >
          <p
            className="font-sans font-medium uppercase"
            style={{
              color: hero.networkLabelColor,
              fontSize: "var(--net-label)",
              letterSpacing: hero.networkLabelTracking,
              lineHeight: 1.5,
            }}
          >
            {networkIntro.eyebrow}
          </p>
          <p className="mt-[0.25rem] font-[family-name:var(--font-display)] text-[1.5rem] uppercase leading-[1.25] text-bronze md:text-[1.625rem] lg:text-[2rem]">
            {networkIntro.title}
          </p>
        </motion.div>

        {/* Phone: 2-col + centered last. Tablet+: horizontal row */}
        <ul className="grid w-full grid-cols-2 gap-x-[1rem] gap-y-[1.25rem] md:flex md:flex-1 md:items-start md:justify-between md:gap-0">
          {networkItems.map((item, i) => {
            const isLast = i === networkItems.length - 1;
            return (
              <motion.li
                key={item.lines.join("-")}
                variants={itemVariants}
                className={`flex flex-col items-center gap-[0.5rem] text-center md:flex-1 md:px-[0.35rem] lg:px-[0.75rem] ${
                  i > 0 ? "md:border-l md:border-[#6B3F24]/40" : ""
                } ${
                  isLast
                    ? "col-span-2 w-[7.125rem] justify-self-center md:col-auto md:w-auto"
                    : "w-full"
                }`}
              >
                <Image
                  src={item.icon}
                  alt=""
                  width={32}
                  height={32}
                  className="object-contain"
                  style={{
                    width: "var(--net-icon)",
                    height: "var(--net-icon)",
                  }}
                  aria-hidden
                />
                <span
                  className="flex h-[3rem] flex-col justify-start"
                  style={{
                    width: "var(--net-item-w)",
                    color: hero.networkLabelColor,
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--net-label)",
                    fontWeight: 500,
                    letterSpacing: hero.networkLabelTracking,
                    textTransform: "uppercase",
                    lineHeight: 1.5,
                  }}
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
