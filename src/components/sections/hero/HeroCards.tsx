"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { heroAssets, heroCards } from "./content";
import { hero } from "./tokens";

export function HeroCards() {
  return (
    <motion.div
      id="overview"
      className="relative z-10 mx-auto w-full max-w-[90rem] scroll-mt-[5rem] px-5 pb-[3rem] pt-[2.5rem] md:pt-[6rem] lg:px-[var(--hero-pad-x)] lg:pb-[4rem] lg:pt-[3.5rem]"
      style={{ "--hero-pad-x": hero.padX } as CSSProperties}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.14 } },
      }}
    >
      <div className="mx-auto grid w-full max-w-[40rem] grid-cols-1 justify-items-center gap-[3rem] md:max-w-[44rem] md:grid-cols-2 md:gap-x-[2.5rem] md:gap-y-[2.5rem] lg:max-w-none lg:grid-cols-4 lg:justify-items-stretch lg:gap-[1.25rem]">
        {heroCards.map((card) => (
          <motion.article
            key={card.title}
            className="relative w-full max-w-[19.0625rem] lg:h-[40.8125rem] lg:max-w-none lg:w-[19.0625rem]"
            variants={{
              hidden: { opacity: 0, y: -28 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            <div className="absolute inset-x-0 bottom-0 top-[2.5rem] overflow-hidden lg:h-[33.5rem] lg:top-[5.3125rem]">
              <Image
                src={heroAssets.cardBg}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 305px"
                aria-hidden
              />
            </div>

            {/* Medallion sits on the card edge: half outside, half inside */}
            <div
              className="absolute left-1/2 top-0 z-10 h-[5rem] w-[6rem] -translate-x-1/2 lg:h-[var(--hero-medallion-h)] lg:w-[var(--hero-medallion-w)]"
              style={
                {
                  "--hero-medallion-w": hero.medallionW,
                  "--hero-medallion-h": hero.medallionH,
                } as CSSProperties
              }
            >
              <Image
                src={card.icon}
                alt=""
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 96px, 160px"
                aria-hidden
              />
            </div>

            <div
              className="relative z-10 flex flex-col items-center px-[1rem] pb-[2.5rem] pt-[5.5rem] text-center lg:absolute lg:inset-x-0 lg:top-[13.625rem] lg:pb-0 lg:pt-0"
              style={{ gap: hero.cardInnerGap }}
            >
              <h3
                className="w-full font-[family-name:var(--font-display)] uppercase leading-[1.4] text-cream"
                style={{ fontSize: hero.cardTitle }}
              >
                {card.title}
              </h3>
              <span
                className="block h-[0.0625rem] bg-gold-border"
                style={{ width: hero.cardDividerW }}
                aria-hidden
              />
              <p
                className="w-full font-sans font-medium leading-[1.5] text-cream"
                style={{
                  fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
                  letterSpacing: hero.cardBodyTracking,
                }}
              >
                {card.body.map((body, index) => (
                  <span key={index} className="block">
                    {body}
                  </span>
                ))}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
}
