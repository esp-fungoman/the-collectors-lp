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
      className="relative overflow-hidden pb-16
      [--space-pad-top:4rem] md:[--space-pad-top:8rem] lg:[--space-pad-top:15rem]"
      style={{ paddingTop: "var(--space-pad-top)" }}
    >
      {/* Full-bleed bg — stretch on mobile so both Masterpiece + Curatorial are covered */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <Image
          src={masterpieceAssets.bg}
          alt=""
          fill
          className="object-fill object-top lg:object-cover"
          sizes="100vw"
          priority={false}
        />
      </div>
      <div className="relative z-10 flex w-full flex-col">
        <Masterpiece />
        <CuratorialPractice />
      </div>
    </Section>
  );
}
