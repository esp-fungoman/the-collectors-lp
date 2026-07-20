"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { onSwipeEnd } from "@/lib/swipe";
import { cultural } from "./culturalContent";

const ease = [0.22, 1, 0.36, 1] as const;
const duration = 0.85;

/** Same as Masterpiece Carousel — opacity stays 1, slide on x only. */
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

const peekVariants = {
  enter: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0 },
};

type CulturalCarouselProps = {
  images: readonly string[];
  page: number;
  direction: number;
  alt: string;
  onPaginate?: (dir: number) => void;
};

function wrap(index: number, length: number) {
  return ((index % length) + length) % length;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function SlideBadge({ label }: { label: string }) {
  return (
    <span
      className="absolute bottom-0 left-0 z-10 flex items-center justify-center font-sans uppercase text-white"
      style={{
        background: cultural.badgeBg,
        paddingLeft: cultural.badgePadX,
        paddingRight: cultural.badgePadX,
        paddingTop: cultural.badgePadY,
        paddingBottom: cultural.badgePadY,
        fontSize: cultural.badgeSize,
        lineHeight: 1.4,
      }}
    >
      {label}
    </span>
  );
}

export function CulturalCarousel({
  images,
  page,
  direction,
  alt,
  onPaginate,
}: CulturalCarouselProps) {
  const count = images.length;
  if (count === 0) {
    return (
      <div
        className="flex w-full items-center justify-center border border-cream/20 text-cream/50"
        style={{
          width: "var(--slide-w)",
          height: "var(--slide-h)",
          minHeight: cultural.slideH,
        }}
      >
        <p className="font-sans text-sm uppercase tracking-wide">Coming soon</p>
      </div>
    );
  }

  const index = wrap(page, count);
  const active = images[index];
  const next = images[wrap(index + 1, count)];
  const prefetch = images[wrap(index + 2, count)];

  return (
    <div
      className="relative flex w-full items-stretch"
      style={{ gap: cultural.slideGap, minHeight: "var(--slide-h)" }}
    >
      {/* Prefetch neighbors so motion isn’t blocked by decode */}
      <div
        className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
        aria-hidden
      >
        <Image src={next} alt="" width={1} height={1} />
        <Image src={prefetch} alt="" width={1} height={1} />
        <Image src={images[wrap(index - 1, count)]} alt="" width={1} height={1} />
      </div>

      <div
        className="relative shrink-0 touch-pan-y overflow-hidden"
        style={{ width: "var(--slide-w)", height: "var(--slide-h)" }}
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
            drag={onPaginate ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={
              onPaginate
                ? (_, info) => onSwipeEnd(info, onPaginate)
                : undefined
            }
          >
            <Image
              src={active}
              alt={`${alt} ${pad(index + 1)}`}
              fill
              className="pointer-events-none object-cover"
              sizes="(max-width: 1024px) 100vw, 847px"
              priority
              draggable={false}
            />
            <SlideBadge label={pad(index + 1)} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Next peek — CSS background + opacity crossfade like Masterpiece sides */}
      <div
        className="relative hidden shrink-0 overflow-hidden lg:block"
        style={{ width: "var(--peek-w)", height: "var(--slide-h)" }}
        aria-hidden
      >
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={next}
            className="absolute inset-0"
            variants={peekVariants}
            initial="enter"
            animate="show"
            exit="exit"
            transition={{ duration, ease }}
            style={{
              background: `url(${next}) lightgray 50% / cover no-repeat`,
            }}
          />
        </AnimatePresence>
        <SlideBadge label={pad(wrap(index + 1, count) + 1)} />
      </div>
    </div>
  );
}
