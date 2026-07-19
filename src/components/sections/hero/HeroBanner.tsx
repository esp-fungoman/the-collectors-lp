"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ContactCtaLink } from "@/components/lead/ContactCtaLink";
import { ctaNames } from "@/lib/leads/ctaNames";
import { bannerCta, bannerStats, heroAssets } from "./content";
import { hero } from "./tokens";

const ease = [0.22, 1, 0.36, 1] as const;

const eyebrowStyle: CSSProperties = {
  color: "#FEF5E2",
  fontFamily: "var(--font-body)",
  fontSize: hero.bannerEyebrowSize,
  fontWeight: 500,
  fontStyle: "normal",
  lineHeight: 1.5,
  letterSpacing: hero.bannerEyebrowTracking,
  textTransform: "uppercase",
};

const valueStyle: CSSProperties = {
  color: hero.bannerValueColor,
  fontFamily: "var(--font-display)",
  fontSize: hero.bannerValueSize,
  fontWeight: 400,
  fontStyle: "normal",
  lineHeight: 1.4,
  textTransform: "uppercase",
};

const bannerContainer = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.35,
      staggerChildren: 0.12,
    },
  },
};

/** Horizontal swipe-in for banner stats / CTA */
const swipeItem = {
  hidden: { opacity: 0, x: 48 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease },
  },
};

function BannerStat({
  eyebrow,
  lines,
  width,
}: {
  eyebrow: string | null;
  lines: readonly [string, string];
  width: string;
}) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center"
      style={{ width, gap: hero.bannerEyebrowGap }}
      variants={swipeItem}
    >
      <p
        className="font-sans"
        style={{
          ...eyebrowStyle,
          opacity: eyebrow ? 1 : 0,
          minHeight: "1.5rem",
        }}
        aria-hidden={!eyebrow}
      >
        {eyebrow ?? "\u00a0"}
      </p>
      <p style={valueStyle}>
        <span className="block">{lines[0]}</span>
        <span className="block">{lines[1]}</span>
      </p>
    </motion.div>
  );
}

function BannerCta({ className = "" }: { className?: string }) {
  return (
    <motion.div variants={swipeItem}>
      <ContactCtaLink
        ctaName={ctaNames.heroBanner}
        href="#contact"
        className={`inline-flex shrink-0 items-center justify-center border border-gold-border bg-gradient-to-r from-gold via-gold-mid via-[44.81%] to-gold-end font-sans font-bold uppercase leading-[1.4] text-ink transition hover:brightness-105 ${className}`.trim()}
        style={{
          width: hero.ctaW,
          height: hero.ctaH,
          paddingLeft: hero.ctaPadX,
          paddingRight: hero.ctaPadX,
          paddingTop: hero.ctaPadY,
          paddingBottom: hero.ctaPadY,
          fontSize: hero.ctaFontSize,
          whiteSpace: "nowrap",
        }}
      >
        {bannerCta}
      </ContactCtaLink>
    </motion.div>
  );
}

export function HeroBanner() {
  const [stat1, stat2, stat3] = bannerStats;

  return (
    <div className="relative z-10 mt-[2.5rem] w-full lg:mt-[3.5rem]">
      <div className="relative mx-auto w-full overflow-hidden min-h-[10rem] lg:h-[10rem] lg:min-h-0">
        <Image
          src={heroAssets.bannerBg}
          alt=""
          fill
          className="pointer-events-none object-cover object-center"
          sizes="100vw"
          aria-hidden
        />

        {/* Desktop */}
        <motion.div
          className="relative z-10 hidden h-full w-full items-center justify-between lg:flex"
          style={{
            paddingLeft: hero.bannerPadX,
            paddingRight: hero.bannerPadX,
          }}
          initial="hidden"
          animate="show"
          variants={bannerContainer}
        >
          <BannerStat
            eyebrow={stat1.eyebrow}
            lines={stat1.lines}
            width={hero.bannerLeftW}
          />

          <motion.div
            className="flex items-center"
            style={{ gap: hero.bannerGroupGap }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12 } },
            }}
          >
            <BannerStat
              eyebrow={stat2.eyebrow}
              lines={stat2.lines}
              width={hero.bannerStatW}
            />

            <motion.div
              className="relative mt-4 flex shrink-0 items-center justify-center"
              style={{ height: hero.bannerDividerH, width: "0.75rem" }}
              aria-hidden
              variants={swipeItem}
            >
              <Image
                src={heroAssets.bannerDivider}
                alt=""
                width={12}
                height={64}
                className="h-full w-auto object-contain"
              />
            </motion.div>

            <BannerStat
              eyebrow={stat3.eyebrow}
              lines={stat3.lines}
              width={hero.bannerStatW}
            />

            <BannerCta />
          </motion.div>
        </motion.div>

        {/* Mobile / tablet */}
        <motion.div
          className="relative z-10 flex flex-col items-center justify-center gap-[1.75rem] px-5 py-[1.3125rem] lg:hidden"
          initial="hidden"
          animate="show"
          variants={bannerContainer}
        >
          <BannerStat eyebrow={stat1.eyebrow} lines={stat1.lines} width="100%" />
          <BannerStat eyebrow={stat2.eyebrow} lines={stat2.lines} width="100%" />
          <BannerStat eyebrow={stat3.eyebrow} lines={stat3.lines} width="100%" />
          <BannerCta className="max-w-full" />
        </motion.div>
      </div>
    </div>
  );
}
