"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { useMenu } from "@/components/nav/MenuProvider";
import { heroAssets } from "./content";
import { hero } from "./tokens";

export function HeroHeader() {
  const { setOpen } = useMenu();

  return (
    <motion.header
      className="sticky top-0 z-30 flex w-full items-center justify-between px-5 lg:h-[var(--hero-header-h)] lg:px-[var(--hero-pad-x)] mt-4 lg:mt-0"
      style={
        {
          "--hero-header-h": hero.headerH,
          "--hero-pad-x": hero.padX,
        } as CSSProperties
      }
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <a
        href="/"
        className="relative block shrink-0"
        aria-label="The Collectors"
      >
        <Image
          src={heroAssets.logo}
          alt="The Collectors"
          width={64}
          height={72}
          priority
          className="h-[3.5rem] w-auto object-contain lg:h-[var(--hero-logo-h)] lg:w-auto"
          style={
            {
              "--hero-logo-h": hero.logoH,
            } as CSSProperties
          }
        />
      </a>

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center justify-center p-[0.5rem] transition hover:opacity-80 cursor-pointer"
        style={{ width: hero.menuHit, height: hero.menuHit }}
        aria-label="Open menu"
      >
        <Image
          src={heroAssets.hamburger}
          alt=""
          width={40}
          height={40}
          className="object-contain"
          style={{ width: hero.menuIcon, height: hero.menuIcon }}
          aria-hidden
        />
      </button>
    </motion.header>
  );
}
