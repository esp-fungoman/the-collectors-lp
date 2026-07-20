"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useState } from "react";
import { ContactCtaLink } from "@/components/lead/ContactCtaLink";
import { ConceptDesignLabel } from "@/components/ui/ConceptDesignLabel";
import { Section } from "@/components/ui/Section";
import { ctaNames } from "@/lib/leads/ctaNames";
import { onSwipeEnd } from "@/lib/swipe";
import {
  concept,
  conceptAssets,
  conceptCopy,
  conceptSlides,
} from "./conceptContent";

const ease = [0.22, 1, 0.36, 1] as const;
const duration = 0.85;

const activeVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : "-100%",
  }),
  center: { x: 0 },
  exit: (dir: number) => ({
    x: dir > 0 ? "-100%" : "100%",
  }),
};

const peekVariants = {
  enter: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0 },
};

function wrap(index: number, length: number) {
  return ((index % length) + length) % length;
}

export function ConceptSection() {
  const [[page, direction], setPage] = useState([0, 1]);
  const count = conceptSlides.length;
  const index = wrap(page, count);

  const paginate = useCallback((dir: number) => {
    setPage(([p]) => [p + dir, dir]);
  }, []);

  const advance = useCallback(() => {
    paginate(1);
  }, [paginate]);

  const active = conceptSlides[index];
  const peeks = [1, 2, 3, 4].map((offset) => conceptSlides[wrap(index + offset, count)]);

  return (
    <Section
      id="concept"
      reveal={false}
      className="relative w-full overflow-hidden [--title-size:2.5rem] [--subtitle-size:1rem] lg:[--title-size:4rem] lg:[--subtitle-size:1.5rem]"
    >
      {/* Prefetch */}
      <div
        className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
        aria-hidden
      >
        {peeks.map((s) => (
          <Image key={s.src} src={s.src} alt="" width={1} height={1} />
        ))}
      </div>

      {/* Desktop */}
      <div
        className="relative mx-auto hidden w-full max-w-[90rem] lg:flex"
        style={{ height: concept.sectionH }}
      >
        {/* Active left */}
        <div
          className="relative shrink-0 touch-pan-y overflow-hidden"
          style={{ width: concept.activeW, height: concept.sectionH }}
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={page}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
              custom={direction}
              variants={activeVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration, ease }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => onSwipeEnd(info, paginate)}
            >
              <Image
                src={active.src}
                alt={active.alt}
                fill
                className="pointer-events-none object-cover"
                sizes="927px"
                priority
                draggable={false}
              />
              <ConceptDesignLabel />
            </motion.div>
          </AnimatePresence>

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[1]"
            style={{
              height: concept.gradientH,
              background:
                "linear-gradient(to top, #3F261A 0%, rgba(63,38,26,0) 100%)",
            }}
            aria-hidden
          />

          <div
            className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between"
            style={{
              paddingLeft: concept.footerPadX,
              paddingRight: concept.footerPadX,
              paddingTop: concept.footerPadY,
              paddingBottom: concept.footerPadY,
            }}
          >
            <div className="flex flex-col items-start">
              <h2
                className="uppercase"
                style={{
                  color: concept.titleColor,
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--title-size)",
                  fontWeight: 400,
                  lineHeight: 1.4,
                  marginBottom: "-0.5rem",
                }}
              >
                {conceptCopy.title}
              </h2>
              <p
                className="font-sans uppercase"
                style={{
                  color: concept.titleColor,
                  fontSize: "var(--subtitle-size)",
                  fontWeight: 500,
                  lineHeight: 1.5,
                  letterSpacing: concept.subtitleTracking,
                }}
              >
                {conceptCopy.subtitle}
              </p>
            </div>

            <ContactCtaLink
              ctaName={ctaNames.concept}
              href={conceptCopy.ctaHref}
              className="inline-flex shrink-0 items-center justify-center border border-gold-border bg-gradient-to-r from-gold via-gold-mid via-[44.81%] to-gold-end font-sans font-bold uppercase leading-[1.4] text-ink transition hover:brightness-105"
              style={{
                paddingLeft: concept.ctaPadX,
                paddingRight: concept.ctaPadX,
                paddingTop: concept.ctaPadY,
                paddingBottom: concept.ctaPadY,
                fontSize: concept.ctaFontSize,
              }}
            >
              {conceptCopy.cta}
            </ContactCtaLink>
          </div>
        </div>

        {/* Right peek stack */}
        <div
          className="relative flex shrink-0 flex-col"
          style={{ width: concept.peekColW, height: concept.sectionH }}
        >
          {peeks.map((slide, i) => (
            <div
              key={`peek-slot-${i}`}
              className="relative overflow-hidden"
              style={{ height: concept.peekH }}
            >
              <AnimatePresence initial={false} mode="sync">
                <motion.div
                  key={slide.src}
                  className="absolute inset-0"
                  variants={peekVariants}
                  initial="enter"
                  animate="show"
                  exit="exit"
                  transition={{ duration, ease }}
                  style={{
                    background: `url(${slide.src}) lightgray 50% / cover no-repeat`,
                  }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-black/60" aria-hidden />
              <ConceptDesignLabel />
            </div>
          ))}

          <button
            type="button"
            onClick={advance}
            className="absolute z-10"
            style={{
              width: concept.arrowW,
              height: concept.arrowH,
              right: concept.arrowRight,
              bottom: concept.arrowBottom,
            }}
            aria-label="Next concept image"
          >
            <span className="relative block h-full w-full">
              <Image
                src={conceptAssets.arrow}
                alt=""
                fill
                className="object-contain"
                aria-hidden
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex w-full flex-col lg:hidden">
        <div className="relative aspect-[16/9] w-full touch-pan-y overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={page}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
              custom={direction}
              variants={activeVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration, ease }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => onSwipeEnd(info, paginate)}
            >
              <Image
                src={active.src}
                alt={active.alt}
                fill
                className="pointer-events-none object-cover"
                sizes="100vw"
                priority
                draggable={false}
              />
              <ConceptDesignLabel />
            </motion.div>
          </AnimatePresence>

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0"
            style={{
              height: "8rem",
              background:
                "linear-gradient(to top, #3F261A 0%, rgba(63,38,26,0) 100%)",
            }}
            aria-hidden
          />

          <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-start gap-3 px-5 pb-5">
            <div>
              <h2
                className="uppercase"
                style={{
                  color: concept.titleColor,
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--title-size)",
                  lineHeight: 1.4,
                }}
              >
                {conceptCopy.title}
              </h2>
              <p
                className="font-sans uppercase"
                style={{
                  color: concept.titleColor,
                  fontSize: "var(--subtitle-size)",
                  fontWeight: 500,
                  letterSpacing: concept.subtitleTracking,
                }}
              >
                {conceptCopy.subtitle}
              </p>
            </div>
            <ContactCtaLink
              ctaName={ctaNames.concept}
              href={conceptCopy.ctaHref}
              className="inline-flex max-w-full whitespace-normal border border-gold-border bg-gradient-to-r from-gold via-gold-mid via-[44.81%] to-gold-end px-4 py-3 text-center font-sans text-sm font-bold uppercase text-ink"
            >
              {conceptCopy.cta}
            </ContactCtaLink>
          </div>

          {/* Tablet: next arrow inside active slide */}
          <button
            type="button"
            onClick={advance}
            className="absolute bottom-4 right-4 z-20 hidden h-10 w-[4.5rem] md:block"
            aria-label="Next concept image"
          >
            <span className="relative block h-full w-full">
              <Image
                src={conceptAssets.arrow}
                alt=""
                fill
                className="object-contain"
                aria-hidden
              />
            </span>
          </button>
        </div>

        <div className="relative grid grid-cols-2">
          {peeks.map((slide, i) => (
            <div
              key={`m-${page}-${i}`}
              className="relative aspect-[4/3] overflow-hidden"
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `url(${slide.src}) lightgray 50% / contain no-repeat`,
                }}
              />
              <div className="absolute inset-0 bg-black/60" aria-hidden />
              <ConceptDesignLabel />
            </div>
          ))}
          {/* Phone: arrow stays on peek grid */}
          <button
            type="button"
            onClick={advance}
            className="absolute bottom-3 right-3 z-10 h-10 w-[4.5rem] md:hidden"
            aria-label="Next concept image"
          >
            <span className="relative block h-full w-full">
              <Image
                src={conceptAssets.arrow}
                alt=""
                fill
                className="object-contain"
                aria-hidden
              />
            </span>
          </button>
        </div>
      </div>
    </Section>
  );
}
