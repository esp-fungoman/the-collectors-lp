"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { Section } from "@/components/ui/Section";
import { heroAssets } from "./content";
import { HeroBanner } from "./HeroBanner";
import { HeroCards } from "./HeroCards";
import { HeroHeader } from "./HeroHeader";
import { HeroNetwork } from "./HeroNetwork";
import { HeroTitle } from "./HeroTitle";
import { hero } from "./tokens";

export function Hero() {
  return (
    <Section
      id="hero"
      reveal={false}
      className="relative isolate min-h-screen lg:min-h-[var(--hero-artboard-h)]"
      style={
        {
          "--hero-artboard-h": hero.artboardH,
        } as CSSProperties
      }
    >
      <motion.div
        className="absolute inset-0 -z-10 origin-top overflow-hidden"
        initial={{ scale: 1 }}
        animate={{ scale: 1.03 }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Image
          src={heroAssets.bg}
          alt=""
          fill
          priority
          quality={75}
          className="object-cover object-top"
          sizes="100vw"
          aria-hidden
        />
      </motion.div>

      <div className="relative flex min-h-[inherit] w-full flex-col">
        <HeroHeader />
        <div className="flex flex-1 flex-col pt-[1.5rem] lg:pt-[2rem]">
          <HeroTitle />
          <HeroNetwork />
          <div className="mt-[2.5rem] w-full md:mt-[3.5rem] lg:mt-[21.25rem]">
            <HeroBanner />
            <HeroCards />
          </div>
        </div>
      </div>
    </Section>
  );
}
