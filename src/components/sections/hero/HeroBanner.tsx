"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ContactCtaLink } from "@/components/lead/ContactCtaLink";
import { ctaNames } from "@/lib/leads/ctaNames";
import { bannerCta, bannerStats, heroAssets } from "./content";
import { hero } from "./tokens";

const ease = [0.22, 1, 0.36, 1] as const;

/** Whole banner (bg + content) swipes in as one unit */
const bannerSwipe = {
  hidden: { opacity: 0, x: 64 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease, delay: 0.2 },
  },
};

function BannerStat({
  eyebrow,
  lines,
  width,
  compact = false,
  /** Hide eyebrow spacer below md only; tablet/desktop still reserve space when null. */
  hideEyebrowOnMobile = false,
}: {
  eyebrow: string | null;
  lines: readonly [string, string];
  width: string;
  compact?: boolean;
  hideEyebrowOnMobile?: boolean;
}) {
  const eyebrowStyle: CSSProperties = {
    color: "#FEF5E2",
    fontFamily: "var(--font-body)",
    fontSize: compact ? "1rem" : hero.bannerEyebrowSize,
    fontWeight: 500,
    fontStyle: "normal",
    lineHeight: 1.5,
    letterSpacing: hero.bannerEyebrowTracking,
    textTransform: "uppercase",
  };

  const valueStyle: CSSProperties = {
    color: hero.bannerValueColor,
    fontFamily: "var(--font-display)",
    fontSize: compact ? "1.5rem" : hero.bannerValueSize,
    fontWeight: 400,
    fontStyle: "normal",
    lineHeight: 1.3,
    textTransform: "uppercase",
  };

  return (
    <div
      className="flex flex-col items-center justify-center text-center"
      style={{ width, gap: hero.bannerEyebrowGap }}
    >
      <p
        className={`font-sans ${hideEyebrowOnMobile ? "max-md:hidden" : ""}`.trim()}
        style={{
          ...eyebrowStyle,
          opacity: eyebrow ? 1 : 0,
          minHeight: compact ? "1.25rem" : "1.5rem",
        }}
        aria-hidden={!eyebrow}
      >
        {eyebrow ?? "\u00a0"}
      </p>
      <p
        style={valueStyle}
        className={
          hideEyebrowOnMobile ? "mt-2 max-md:mt-0 lg:mt-0" : "mt-2 lg:mt-0"
        }
      >
        <span className="block">{lines[0]}</span>
        <span className="block">{lines[1]}</span>
      </p>
    </div>
  );
}

function BannerCta({
  className = "",
  fullWidth = false,
}: {
  className?: string;
  fullWidth?: boolean;
}) {
  return (
    <div className={fullWidth ? "w-full max-w-full" : undefined}>
      <ContactCtaLink
        ctaName={ctaNames.heroBanner}
        href="#contact"
        className={`inline-flex items-center justify-center border border-gold-border bg-gradient-to-r from-gold via-gold-mid via-[44.81%] to-gold-end font-sans font-bold uppercase leading-[1.4] text-ink transition hover:brightness-105 ${
          fullWidth ? "w-full max-w-full shrink" : "shrink-0"
        } ${className}`.trim()}
        style={{
          width: fullWidth ? "100%" : hero.ctaW,
          minHeight: hero.ctaH,
          height: fullWidth ? "auto" : hero.ctaH,
          paddingLeft: hero.ctaPadX,
          paddingRight: hero.ctaPadX,
          paddingTop: hero.ctaPadY,
          paddingBottom: hero.ctaPadY,
          fontSize: hero.ctaFontSize,
          whiteSpace: fullWidth ? "normal" : "nowrap",
          textAlign: "center",
        }}
      >
        {bannerCta}
      </ContactCtaLink>
    </div>
  );
}

export function HeroBanner() {
  const [stat1, stat2, stat3] = bannerStats;

  return (
    <div className="relative z-10 mt-[2rem] w-full md:mt-[16rem] lg:mt-[3.5rem]">
      <motion.div
        className="relative mx-auto h-auto min-h-0 w-full overflow-hidden md:h-[10rem] md:min-h-0 lg:h-[10rem]"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        variants={bannerSwipe}
      >
        <Image
          src={heroAssets.bannerBg}
          alt=""
          fill
          className="pointer-events-none object-cover object-center"
          sizes="100vw"
          aria-hidden
        />

        {/* Desktop */}
        <div
          className="relative z-10 hidden h-full w-full items-center justify-between lg:flex"
          style={{
            paddingLeft: hero.bannerPadX,
            paddingRight: hero.bannerPadX,
          }}
        >
          <BannerStat
            eyebrow={stat1.eyebrow}
            lines={stat1.lines}
            width={hero.bannerLeftW}
          />

          <div
            className="flex items-center"
            style={{ gap: hero.bannerGroupGap }}
          >
            <BannerStat
              eyebrow={stat2.eyebrow}
              lines={stat2.lines}
              width={hero.bannerStatW}
            />

            <div
              className="relative mt-4 flex shrink-0 items-center justify-center"
              style={{ height: hero.bannerDividerH, width: "0.75rem" }}
              aria-hidden
            >
              <Image
                src={heroAssets.bannerDivider}
                alt=""
                width={12}
                height={64}
                className="h-full w-auto object-contain"
              />
            </div>

            <BannerStat
              eyebrow={stat3.eyebrow}
              lines={stat3.lines}
              width={hero.bannerStatW}
              hideEyebrowOnMobile
            />

            <BannerCta />
          </div>
        </div>

        {/* Tablet — compact horizontal strip */}
        <div className="relative z-10 hidden h-full w-full items-center justify-between gap-2 px-6 md:flex lg:hidden">
          <BannerStat
            eyebrow={stat1.eyebrow}
            lines={stat1.lines}
            width="min(14rem,28%)"
            compact
          />

          <div className="flex min-w-0 flex-1 items-center justify-end gap-6">
            <BannerStat
              eyebrow={stat2.eyebrow}
              lines={stat2.lines}
              width="min(13rem,30%)"
              compact
            />

            <div
              className="relative mt-2 flex shrink-0 items-center justify-center"
              style={{ height: "3rem", width: "0.5rem" }}
              aria-hidden
            >
              <Image
                src={heroAssets.bannerDivider}
                alt=""
                width={12}
                height={64}
                className="h-full w-auto object-contain"
              />
            </div>

            <BannerStat
              eyebrow={stat3.eyebrow}
              lines={stat3.lines}
              width="min(13rem,26%)"
              compact
              hideEyebrowOnMobile
            />

            <BannerCta />
          </div>
        </div>

        {/* Phone — stacked */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-[1.75rem] px-5 py-[1.3125rem] md:hidden">
          <BannerStat
            eyebrow={stat1.eyebrow}
            lines={stat1.lines}
            width="100%"
            compact
          />
          <BannerStat
            eyebrow={stat2.eyebrow}
            lines={stat2.lines}
            width="100%"
            compact
          />
          <BannerStat
            eyebrow={stat3.eyebrow}
            lines={stat3.lines}
            width="100%"
            compact
            hideEyebrowOnMobile
          />
          <BannerCta fullWidth />
        </div>
      </motion.div>
    </div>
  );
}
