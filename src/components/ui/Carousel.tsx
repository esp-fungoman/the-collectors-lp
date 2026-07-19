"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useState, type CSSProperties } from "react";

export type CarouselSlide = {
  src: string;
  alt: string;
  caption?: string;
};

type CarouselProps = {
  slides: CarouselSlide[];
  className?: string;
  arrowSrc?: string;
  showConceptLabel?: boolean;
  conceptLabel?: string;
};

function wrap(index: number, length: number) {
  return ((index % length) + length) % length;
}

const ease = [0.22, 1, 0.36, 1] as const;
const duration = 0.85;

/** Opacity stays 1 — fade-on-x was causing the L/R ghost band. */
const activeVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : "-100%",
  }),
  center: {
    x: 0,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-100%" : "100%",
  }),
};

const sideVariants = {
  enter: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0 },
};

export function Carousel({
  slides,
  className = "",
  arrowSrc = "/images/masterpiece/arrow-right.webp",
  showConceptLabel = false,
  conceptLabel = "*Concept Design",
}: CarouselProps) {
  const [[page, direction], setPage] = useState([0, 0]);
  const count = slides.length;
  const index = wrap(page, count);

  const paginate = useCallback((newDirection: number) => {
    setPage(([p]) => [p + newDirection, newDirection]);
  }, []);

  if (count === 0) return null;

  const prevSlide = slides[wrap(index - 1, count)];
  const activeSlide = slides[index];
  const nextSlide = slides[wrap(index + 1, count)];

  return (
    <div
      className={`relative w-full overflow-x-hidden [--active-w:calc(100vw-2.5rem)] [--active-h:14rem] [--side-w:0px] [--side-h:0px] [--slide-gap:0.75rem] [--arrow-w:4rem] [--arrow-h:2.25rem] lg:[--active-w:52.875rem] lg:[--active-h:26.4375rem] lg:[--side-w:37.5rem] lg:[--side-h:18.75rem] lg:[--slide-gap:1.25rem] lg:[--arrow-w:6.25rem] lg:[--arrow-h:3.5rem] ${className}`.trim()}
      role="region"
      aria-roledescription="carousel"
      aria-label="Tuyệt tác không gian"
    >
      <div
        className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
        aria-hidden
      >
        <Image src={prevSlide.src} alt="" width={1} height={1} />
        <Image src={nextSlide.src} alt="" width={1} height={1} />
        <Image
          src={slides[wrap(index + 2, count)].src}
          alt=""
          width={1}
          height={1}
        />
      </div>

      <div
        className="relative flex items-center justify-center"
        style={{ gap: "var(--slide-gap)", minHeight: "var(--active-h)" }}
      >
        <SideSlide slide={prevSlide} />

        {/* Active image only — no arrows inside */}
        <div
          className="relative shrink-0 overflow-hidden"
          style={{ width: "var(--active-w)", height: "var(--active-h)" }}
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={page}
              className="absolute inset-0"
              custom={direction}
              variants={activeVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration, ease }}
            >
              <Image
                src={activeSlide.src}
                alt={activeSlide.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 846px"
                priority
              />
              {activeSlide.caption ? (
                <p className="absolute bottom-4 left-0 right-0 px-4 text-center font-sans text-sm text-cream">
                  {activeSlide.caption}
                </p>
              ) : null}
              {showConceptLabel ? (
                <p
                  className="pointer-events-none absolute bottom-2 right-4 font-sans text-[0.75rem] leading-[1.4] text-white"
                  style={{ opacity: 0.2 }}
                >
                  {conceptLabel}
                </p>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>

        <SideSlide slide={nextSlide} />

        {/* Desktop only — outside active, offset 3.5rem past L/R edges */}
        <NavArrow
          dir="prev"
          arrowSrc={arrowSrc}
          onClick={() => paginate(-1)}
          className="pointer-events-auto absolute top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
          style={{ left: "calc(50% - (var(--active-w) / 2) - 5.5rem)" }}
        />
        <NavArrow
          dir="next"
          arrowSrc={arrowSrc}
          onClick={() => paginate(1)}
          className="pointer-events-auto absolute top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
          style={{ left: "calc(50% + (var(--active-w) / 2) + 5.5rem)" }}
        />
      </div>
    </div>
  );
}

function SideSlide({ slide }: { slide: CarouselSlide }) {
  return (
    <div
      className="relative hidden shrink-0 overflow-hidden lg:block"
      style={{ width: "var(--side-w)", height: "var(--side-h)" }}
      aria-hidden
    >
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={slide.src}
          className="absolute inset-0"
          variants={sideVariants}
          initial="enter"
          animate="show"
          exit="exit"
          transition={{ duration, ease }}
        >
          <Image
            src={slide.src}
            alt=""
            fill
            className="object-cover"
            sizes="600px"
          />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function NavArrow({
  dir,
  arrowSrc,
  onClick,
  className,
  style,
}: {
  dir: "prev" | "next";
  arrowSrc: string;
  onClick: () => void;
  className: string;
  style?: CSSProperties;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
      style={{
        width: "var(--arrow-w)",
        height: "var(--arrow-h)",
        ...style,
      }}
      aria-label={dir === "prev" ? "Previous slide" : "Next slide"}
    >
      <span className="relative block h-full w-full">
        <Image
          src={arrowSrc}
          alt=""
          fill
          className={`object-contain ${dir === "prev" ? "-scale-x-100" : ""}`.trim()}
          aria-hidden
        />
      </span>
    </button>
  );
}
