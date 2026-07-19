"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CulturalCarousel } from "./CulturalCarousel";
import {
  cultural,
  culturalAssets,
  culturalCopy,
  culturalTabs,
} from "./culturalContent";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function CuratorialPractice() {
  const firstWithImages =
    culturalTabs.find((t) => t.images.length > 0)?.id ?? "prive";
  const [tabId, setTabId] = useState(firstWithImages);
  const [[page, direction], setPage] = useState([0, 0]);

  const activeTab = useMemo(
    () => culturalTabs.find((t) => t.id === tabId) ?? culturalTabs[0],
    [tabId],
  );
  const total = activeTab.images.length;
  const slideIndex = total === 0 ? 0 : ((page % total) + total) % total;

  const selectTab = useCallback((id: string, hasImages: boolean) => {
    if (!hasImages) return;
    setTabId(id);
    setPage([0, 0]);
  }, []);

  const paginate = useCallback(
    (dir: number) => {
      if (total === 0) return;
      setPage(([p]) => [p + dir, dir]);
    },
    [total],
  );

  const progress = total === 0 ? 0 : (slideIndex + 1) / total;

  return (
    <section
      id="curatorial"
      className="relative z-10 w-full pt-16 pb-8 [--title-size:2.5rem] [--subtitle-size:1rem] [--tab-name:1.75rem] [--tab-tag:0.875rem] [--slide-w:100%] [--slide-h:16rem] [--peek-w:0rem] [--pad-x:1.25rem] lg:pt-38 lg:[--title-size:4rem] lg:[--subtitle-size:1.5rem] lg:[--tab-name:2rem] lg:[--tab-tag:1rem] lg:[--slide-w:52.9375rem] lg:[--slide-h:42.0625rem] lg:[--peek-w:12rem] lg:[--pad-x:5rem]"
      style={{ paddingLeft: "var(--pad-x)", paddingRight: "var(--pad-x)" }}
    >
      <motion.div
        className="mx-auto flex max-w-[90rem] flex-col items-center text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2
          className="uppercase"
          style={{
            color: cultural.titleColor,
            fontFamily: "var(--font-display)",
            fontSize: "var(--title-size)",
            fontWeight: 400,
            lineHeight: 1.4,
          }}
        >
          {culturalCopy.title}
        </h2>
        <p
          className="font-sans uppercase"
          style={{
            color: cultural.titleColor,
            fontSize: "var(--subtitle-size)",
            fontWeight: 500,
            lineHeight: 1.5,
            letterSpacing: cultural.subtitleTracking,
            marginTop: "-0.25rem",
          }}
        >
          {culturalCopy.subtitle}
        </p>
      </motion.div>

      <div className="mx-auto mt-10 flex max-w-[90rem] flex-col gap-10 lg:mt-14 lg:flex-row lg:items-start lg:gap-12">
        {/* Left: tabs + controls */}
        <div
          className="flex w-full shrink-0 flex-col lg:w-[16.9375rem]"
          style={{ gap: cultural.tabGap }}
        >
          <ul
            className="flex flex-row gap-4 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
            style={{ gap: cultural.tabGap }}
          >
            {culturalTabs.map((tab) => {
              const isActive = tab.id === tabId;
              const hasImages = tab.images.length > 0;
              const disabled = !hasImages;

              return (
                <li key={tab.id} className="shrink-0 cursor-pointer">
                  <button
                    type="button"
                    disabled={disabled}
                    aria-disabled={disabled}
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => selectTab(tab.id, hasImages)}
                    className={`flex w-full flex-col items-start pb-2 text-left transition ${
                      disabled
                        ? "cursor-not-allowed opacity-50"
                        : isActive
                          ? "border-b border-cream opacity-100"
                          : "opacity-50 hover:opacity-80"
                    }`}
                  >
                    <span
                      className="whitespace-nowrap"
                      style={{
                        color: cultural.titleColor,
                        fontFamily: "var(--font-display)",
                        fontSize: "var(--tab-name)",
                        lineHeight: 1.4,
                      }}
                    >
                      {tab.name}
                    </span>
                    <span
                      className="font-sans whitespace-nowrap"
                      style={{
                        color: cultural.titleColor,
                        fontSize: "var(--tab-tag)",
                        fontWeight: 500,
                        lineHeight: 1.5,
                        letterSpacing: cultural.tabTagTracking,
                      }}
                    >
                      {tab.tagline}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Arrows + progress — desktop */}
          <div className="mt-2 hidden w-full max-w-[14rem] flex-col gap-4 lg:flex">
            <div className="flex items-start gap-4">
              <button
                type="button"
                onClick={() => paginate(-1)}
                disabled={total === 0}
                className="relative disabled:opacity-40"
                style={{ width: cultural.arrowW, height: cultural.arrowH }}
                aria-label="Previous image"
              >
                <Image
                  src={culturalAssets.arrow}
                  alt=""
                  fill
                  className="object-contain -scale-x-100"
                  aria-hidden
                />
              </button>
              <button
                type="button"
                onClick={() => paginate(1)}
                disabled={total === 0}
                className="relative disabled:opacity-40"
                style={{ width: cultural.arrowW, height: cultural.arrowH }}
                aria-label="Next image"
              >
                <Image
                  src={culturalAssets.arrow}
                  alt=""
                  fill
                  className="object-contain"
                  aria-hidden
                />
              </button>
            </div>

            <div className="flex items-center gap-2 font-sans text-[1rem] font-medium tracking-[-0.02rem] text-cream">
              <span>{pad(total === 0 ? 0 : slideIndex + 1)}</span>
              <div className="relative h-px flex-1 bg-cream/30">
                <div
                  className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 bg-cream transition-[width] duration-300"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <span>{pad(total)}</span>
            </div>
          </div>
        </div>

        {/* Right: carousel */}
        <div className="min-w-0 flex-1 overflow-hidden">
          <CulturalCarousel
            key={tabId}
            images={activeTab.images}
            page={page}
            direction={direction}
            alt={activeTab.name}
          />

          {/* Mobile progress under carousel */}
          <div className="mt-4 flex items-center gap-3 lg:hidden">
            <button
              type="button"
              onClick={() => paginate(-1)}
              disabled={total === 0}
              className="font-sans text-cream disabled:opacity-40"
              aria-label="Previous image"
            >
              ‹
            </button>
            <div className="flex flex-1 items-center gap-2 font-sans text-sm font-medium text-cream">
              <span>{pad(total === 0 ? 0 : slideIndex + 1)}</span>
              <div className="relative h-px flex-1 bg-cream/30">
                <div
                  className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 bg-cream"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <span>{pad(total)}</span>
            </div>
            <button
              type="button"
              onClick={() => paginate(1)}
              disabled={total === 0}
              className="font-sans text-cream disabled:opacity-40"
              aria-label="Next image"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
