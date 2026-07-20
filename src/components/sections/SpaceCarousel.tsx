"use client";

import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { CuratorialPractice } from "./masterpiece/CuratorialPractice";
import { Masterpiece } from "./masterpiece/Masterpiece";
import { masterpieceAssets } from "./masterpiece/masterpieceContent";

export function SpaceCarousel() {
  return (
    <Section
      id="space"
      reveal={false}
      className="relative overflow-x-hidden overflow-y-visible pb-16
      [--space-pad-top:4rem] md:[--space-pad-top:8rem] lg:[--space-pad-top:15rem]"
      style={{ paddingTop: "var(--space-pad-top)" }}
    >
      <Image
        src={masterpieceAssets.bg}
        alt=""
        fill
        className="pointer-events-none object-cover object-top"
        sizes="100vw"
        aria-hidden
        priority={false}
      />

      <div className="relative z-10 flex w-full flex-col">
        <Masterpiece />
        <CuratorialPractice />
      </div>
    </Section>
  );
}
