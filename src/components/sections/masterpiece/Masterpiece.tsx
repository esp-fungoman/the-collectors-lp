"use client";

import { motion } from "framer-motion";
import { ContactCtaLink } from "@/components/lead/ContactCtaLink";
import { Carousel } from "@/components/ui/Carousel";
import { ctaNames } from "@/lib/leads/ctaNames";
import {
  masterpiece,
  masterpieceAssets,
  masterpieceCopy,
  masterpieceSlides,
} from "./masterpieceContent";

export function Masterpiece() {
  return (
    <div
      className="relative z-10 flex w-full flex-col items-center [--title-size:2.5rem] [--subtitle-size:1rem] [--block-gap:2rem] [--cta-font:0.875rem] lg:[--title-size:4rem] lg:[--subtitle-size:1.5rem] lg:[--block-gap:3rem] lg:[--cta-font:1rem]"
    >
      <motion.div
        className="flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2
          className="uppercase"
          style={{
            color: masterpiece.titleColor,
            fontFamily: "var(--font-display)",
            fontSize: "var(--title-size)",
            fontWeight: 400,
            lineHeight: 1.4,
          }}
        >
          {masterpieceCopy.title}
        </h2>
        <p
          className="font-sans uppercase"
          style={{
            color: masterpiece.titleColor,
            fontSize: "var(--subtitle-size)",
            fontWeight: 500,
            lineHeight: 1.5,
            letterSpacing: masterpiece.subtitleTracking,
            marginTop: "-0.5rem",
          }}
        >
          {masterpieceCopy.subtitle}
        </p>
      </motion.div>

      <motion.div
        className="w-full"
        style={{ marginTop: "var(--block-gap)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Carousel
          slides={masterpieceSlides}
          arrowSrc={masterpieceAssets.arrow}
          showConceptLabel
          conceptLabel={masterpieceCopy.conceptLabel}
        />
      </motion.div>

      <motion.div
        style={{ marginTop: "var(--block-gap)" }}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <ContactCtaLink
          ctaName={ctaNames.masterpiece}
          href={masterpieceCopy.ctaHref}
          className="inline-flex max-w-full items-center justify-center whitespace-normal border border-gold-border bg-gradient-to-r from-gold via-gold-mid via-[44.81%] to-gold-end text-center font-sans font-bold uppercase leading-[1.4] text-ink transition hover:brightness-105"
          style={{
            paddingLeft: masterpiece.ctaPadX,
            paddingRight: masterpiece.ctaPadX,
            paddingTop: masterpiece.ctaPadY,
            paddingBottom: masterpiece.ctaPadY,
            fontSize: "var(--cta-font)",
          }}
        >
          {masterpieceCopy.cta}
        </ContactCtaLink>
      </motion.div>
    </div>
  );
}
