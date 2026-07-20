"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { value, valueAssets, valueCopy, valueItems } from "./valueContent";

export function ValueProps() {
  return (
    <Section
      id="value"
      reveal={false}
      className="relative z-10 overflow-visible [--title-size:2.5rem] [--subtitle-size:1rem] [--title-mt:0rem] [--pin-size:min(17rem,85vw)] [--pin-gap-x:0.5rem] [--pin-gap-y:1.5rem] [--pin-overlap:0rem] [--icon-size:3.5rem] [--icon-top:1.5rem] [--item-font:0.9375rem] [--item-pad-x:1.75rem] [--pad-x:1.25rem] md:[--pin-size:14rem] md:[--pin-gap-y:2rem] md:[--icon-size:3.5rem] md:[--icon-top:1.25rem] md:[--item-font:0.9375rem] md:[--item-pad-x:1.25rem] lg:[--title-size:4rem] lg:[--subtitle-size:1.5rem] lg:[--title-mt:3.5rem] lg:[--pin-size:19.0625rem] lg:[--pin-gap-x:1.25rem] lg:[--pin-gap-y:1.25rem] lg:[--pin-overlap:-9.5625rem] lg:[--icon-size:5rem] lg:[--icon-top:1.75rem] lg:[--item-font:1.125rem] lg:[--item-pad-x:1.75rem] lg:[--pad-x:5rem]"
    >
      <div
        className="relative mx-auto flex w-full max-w-[90rem] flex-col items-center  pb-[3rem] lg:pb-[0]"
        style={{
          minHeight: value.sectionMinH,
          paddingLeft: "var(--pad-x)",
          paddingRight: "var(--pad-x)",
          paddingTop: "3rem",
        }}
      >
        <Image
          src={valueAssets.bg}
          alt=""
          fill
          className="pointer-events-none object-cover object-center"
          sizes="100vw"
          aria-hidden
          priority={false}
        />

        <motion.div
          className="relative z-10 flex flex-col items-center text-center"
          // style={{ gap: value.titleGap }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            className="uppercase"
            style={{
              color: value.titleColor,
              fontFamily: "var(--font-display)",
              fontSize: "var(--title-size)",
              fontWeight: 400,
              lineHeight: 1.4,
              marginTop: "var(--title-mt)",
            }}
          >
            {valueCopy.title}
          </h2>
          <p
            className="font-sans uppercase"
            style={{
              color: value.titleColor,
              fontSize: "var(--subtitle-size)",
              fontWeight: 500,
              lineHeight: 1.5,
              letterSpacing: value.subtitleTracking,
            }}
          >
            {valueCopy.subtitle}
          </p>
        </motion.div>

        <motion.ul
          className="relative z-10 mt-8 grid w-full grid-cols-1 justify-items-center md:grid-cols-2 lg:mt-auto lg:grid-cols-4"
          style={{
            columnGap: "var(--pin-gap-x)",
            rowGap: "var(--pin-gap-y)",
            marginBottom: "var(--pin-overlap)",
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {valueItems.map((item) => (
            <li key={item.title[0]}>
              <ValuePin icon={item.icon} title={item.title} body={item.body} />
            </li>
          ))}
        </motion.ul>
      </div>
    </Section>
  );
}

function ValuePin({
  icon,
  title,
  body,
}: {
  icon: string;
  title: readonly [string, string];
  body: string;
}) {
  const titleStyle: CSSProperties = {
    color: value.itemTitleColor,
    fontFamily: "var(--font-body)",
    fontSize: "var(--item-font)",
    fontWeight: 700,
    lineHeight: 1.5,
    letterSpacing: value.itemTracking,
    textTransform: "uppercase",
  };

  const bodyStyle: CSSProperties = {
    color: value.itemBodyColor,
    fontFamily: "var(--font-body)",
    fontSize: "var(--item-font)",
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: value.itemTracking,
  };

  return (
    <article
      className="relative overflow-hidden rounded-full"
      style={{
        width: "var(--pin-size)",
        height: "var(--pin-size)",
      }}
    >
      <Image
        src={valueAssets.cardBg}
        alt=""
        fill
        className="pointer-events-none object-cover object-center"
        sizes="(max-width: 767px) 85vw, (max-width: 1439px) 50vw, 20vw"
        aria-hidden
      />

      <div
        className="relative z-10 flex h-full w-full flex-col items-center"
        style={{ paddingTop: "var(--icon-top)" }}
      >
        <div
          className="relative shrink-0"
          style={{
            width: "var(--icon-size)",
            height: "var(--icon-size)",
          }}
        >
          <Image
            src={icon}
            alt=""
            fill
            className="object-contain"
            sizes="80px"
            aria-hidden
          />
        </div>

        <div
          className="mt-auto mb-[12%] flex flex-col items-center text-center"
          style={{
            gap: value.itemTextGap,
            paddingLeft: "var(--item-pad-x)",
            paddingRight: "var(--item-pad-x)",
            paddingBottom: "8%",
          }}
        >
          <h3 className="font-sans w-full" style={titleStyle}>
            <span className="block">{title[0]}</span>
            <span className="block">{title[1]}</span>
          </h3>
          <p className="font-sans w-full" style={bodyStyle}>
            {body}
          </p>
        </div>
      </div>
    </article>
  );
}
