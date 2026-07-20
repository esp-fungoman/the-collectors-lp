"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ContactCtaLink } from "@/components/lead/ContactCtaLink";
import { Section } from "@/components/ui/Section";
import { ctaNames } from "@/lib/leads/ctaNames";
import { MapLightBeam } from "./MapLightBeam";
import { map, mapAssets, mapCopy } from "./mapContent";

const ease = [0.22, 1, 0.36, 1] as const;

const eyebrowStyle: CSSProperties = {
  color: map.titleColor,
  fontFamily: "var(--font-body)",
  fontWeight: 500,
  fontStyle: "normal",
  lineHeight: 1.5,
  letterSpacing: map.eyebrowTracking,
  textTransform: "uppercase",
};

const titleStyle: CSSProperties = {
  color: map.titleColor,
  fontFamily: "var(--font-display)",
  fontWeight: 400,
  fontStyle: "normal",
  lineHeight: 1.4,
  textTransform: "uppercase",
};

const timeContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};

const timePopVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease },
  },
};

function MapStage({
  className = "",
  imageClassName,
  align,
}: {
  className?: string;
  imageClassName: string;
  align: "left-top" | "center";
}) {
  return (
    <div className={`relative ${className}`.trim()}>
      <Image
        src={mapAssets.map}
        alt="Bản đồ vị trí The Collectors"
        width={1087}
        height={622}
        className={imageClassName}
        sizes={align === "left-top" ? "(max-width: 1024px) 100vw, 80vw" : "100vw"}
        unoptimized
        priority={false}
      />
      <MapLightBeam align={align} />
    </div>
  );
}

export function Ecosystem() {
  return (
    <Section
      id="ecosystem"
      reveal={false}
      className="relative z-0 overflow-hidden"
      style={{ background: map.gradient }}
    >
      {/* Desktop */}
      <div
        className="relative mx-auto hidden w-full max-w-[90rem] lg:block"
        style={{ height: map.sectionH }}
      >
        <motion.div
          className="absolute z-10 flex flex-col items-start justify-center"
          style={{
            left: map.titleLeft,
            top: map.titleTop,
            width: map.titleW,
            gap: map.titleGap,
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease }}
        >
          <p
            className="font-sans whitespace-nowrap"
            style={{ ...eyebrowStyle, fontSize: map.eyebrowSizeLg }}
          >
            {mapCopy.eyebrow}
          </p>
          <h2 style={{ ...titleStyle, fontSize: map.titleSizeLg }}>
            {mapCopy.title}
          </h2>
        </motion.div>

        <motion.div
          className="absolute top-0"
          style={{
            left: map.mapLeft,
            width: map.mapW,
            height: map.mapH,
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          <MapStage
            className="h-full w-full"
            imageClassName="h-full w-full object-contain object-left-top"
            align="left-top"
          />
        </motion.div>

        <motion.div
          className="absolute left-1/2 z-10 flex -translate-x-1/2 items-center justify-center"
          style={{ top: map.timeTop, gap: map.timeGap }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          variants={timeContainerVariants}
        >
          {mapAssets.times.map((src, i) => (
            <motion.div
              key={src}
              variants={timePopVariants}
              style={{ transformOrigin: "center" }}
              className="shrink-0"
            >
              <Image
                src={src}
                alt={mapCopy.timeAlts[i] ?? ""}
                width={300}
                height={88}
                className="object-contain"
                style={{ width: map.timeW, height: map.timeH }}
                sizes="300px"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="absolute left-1/2 z-10 -translate-x-1/2"
          style={{ top: map.ctaTop }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
        >
          <MapCta fontSize={map.ctaFontSizeLg} />
        </motion.div>
      </div>

      {/* Mobile / tablet — tablet capped at 100vh */}
      <div className="mx-auto flex w-full max-w-[90rem] flex-col items-center px-5 py-12 md:h-[100vh] md:max-h-[100vh] md:justify-between md:gap-3 md:overflow-hidden md:py-6 lg:hidden">
        <motion.div
          className="flex w-full shrink-0 flex-col items-start"
          style={{ gap: map.titleGap }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease }}
        >
          <p
            className="font-sans"
            style={{ ...eyebrowStyle, fontSize: map.eyebrowSize }}
          >
            {mapCopy.eyebrow}
          </p>
          <h2 style={{ ...titleStyle, fontSize: map.titleSize }}>
            {mapCopy.title}
          </h2>
        </motion.div>

        <motion.div
          className="relative mt-6 w-full min-h-0 md:mt-0 md:flex-1 md:max-h-[48vh] "
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          <MapStage
            className="w-full md:h-full"
            imageClassName="h-auto w-full object-contain md:h-full md:max-h-[48vh]"
            align="center"
          />
        </motion.div>

        <motion.div
          className="mt-6 flex w-full shrink-0 flex-col items-center sm:flex-row sm:flex-wrap sm:justify-center md:mt-0"
          style={{ gap: map.timeGap }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={timeContainerVariants}
        >
          {mapAssets.times.map((src, i) => (
            <motion.div
              key={src}
              variants={timePopVariants}
              style={{ transformOrigin: "center" }}
              className="w-full max-w-[18.75rem] shrink-0 sm:w-[min(18.75rem,30%)] md:max-w-[14rem]"
            >
              <Image
                src={src}
                alt={mapCopy.timeAlts[i] ?? ""}
                width={300}
                height={88}
                className="h-auto w-full object-contain"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-8 flex w-full shrink-0 justify-center md:mt-0"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.15, ease }}
        >
          <MapCta className="max-w-full text-center" fontSize={map.ctaFontSize} />
        </motion.div>
      </div>
    </Section>
  );
}

function MapCta({
  className = "",
  fontSize,
}: {
  className?: string;
  fontSize: string;
}) {
  return (
    <ContactCtaLink
      ctaName={ctaNames.ecosystem}
      href={mapCopy.ctaHref}
      className={`inline-flex max-w-full shrink items-center justify-center whitespace-normal border border-gold-border bg-gradient-to-r from-gold via-gold-mid via-[44.81%] to-gold-end text-center font-sans font-bold uppercase leading-[1.4] text-ink transition hover:brightness-105 ${className}`.trim()}
      style={{
        paddingLeft: map.ctaPadX,
        paddingRight: map.ctaPadX,
        paddingTop: map.ctaPadY,
        paddingBottom: map.ctaPadY,
        fontSize,
      }}
    >
      {mapCopy.cta}
    </ContactCtaLink>
  );
}
