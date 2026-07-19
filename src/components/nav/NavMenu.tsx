"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { ContactCtaLink } from "@/components/lead/ContactCtaLink";
import { ctaNames } from "@/lib/leads/ctaNames";
import { useMenu } from "./MenuProvider";
import {
  menuAssets,
  menuLayout,
  menuLinks,
  menuTokens,
} from "./menuContent";

export function NavMenu() {
  const { open, setOpen } = useMenu();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 h-[100dvh] w-screen overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu điều hướng"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={menuAssets.bg}
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            aria-hidden
          />

          {/* Close — top right, Figma pad 80 / icon 40 */}
          <div className="absolute right-0 top-0 z-20 flex items-center justify-end px-5 py-[0.5rem] lg:px-[5rem] lg:py-[0.5rem]">
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center p-[0.5rem] transition hover:opacity-80"
              style={{
                width: menuTokens.closeHit,
                height: menuTokens.closeHit,
              }}
              aria-label="Đóng menu"
            >
              <img
                src={menuAssets.close}
                alt=""
                width={40}
                height={40}
                className="object-contain"
                style={{
                  width: menuTokens.closeIcon,
                  height: menuTokens.closeIcon,
                }}
                aria-hidden
              />
            </button>
          </div>

          {/* Desktop: absolute positions from Figma — logo in golden-ratio twist */}
          <div className="absolute inset-0 z-10 hidden lg:block">
            <motion.div
              className="absolute"
              style={{
                left: `${menuLayout.logo.leftPct}%`,
                top: `${menuLayout.logo.topPct}%`,
                width: `${menuLayout.logo.widthPct}%`,
                aspectRatio: menuLayout.logo.aspect,
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.35, delay: 0.05 }}
            >
              <Image
                src={menuAssets.logo}
                alt="The Collectors"
                fill
                className="object-contain object-center"
                sizes="305px"
                priority
              />
            </motion.div>

            <motion.nav
              className="absolute flex flex-col items-end"
              style={{
                left: `${menuLayout.nav.leftPct}%`,
                top: `${menuLayout.nav.topPct}%`,
                width: `${menuLayout.nav.widthPct}%`,
                gap: menuTokens.listGap,
              }}
              aria-label="Liên kết chính"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.06, delayChildren: 0.08 },
                },
              }}
            >
              {menuLinks.map((item, index) => (
                <MenuLink
                  key={item.href}
                  item={item}
                  isActive={index === 0}
                  align="end"
                  onNavigate={() => setOpen(false)}
                />
              ))}
            </motion.nav>
          </div>

          {/* Mobile: flex-col stack */}
          <div className="relative z-10 flex h-full flex-col items-center gap-[2.5rem] px-5 pb-[2.5rem] pt-[4.5rem] lg:hidden">
            <motion.div
              className="relative h-[14rem] w-[12rem] shrink-0"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
            >
              <Image
                src={menuAssets.logo}
                alt="The Collectors"
                fill
                className="object-contain object-center"
                sizes="12rem"
                priority
              />
            </motion.div>

            <motion.nav
              className="flex w-full flex-col items-center gap-[2.5rem]"
              aria-label="Liên kết chính"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.06, delayChildren: 0.08 },
                },
              }}
            >
              {menuLinks.map((item, index) => (
                <MenuLink
                  key={item.href}
                  item={item}
                  isActive={index === 0}
                  align="center"
                  onNavigate={() => setOpen(false)}
                />
              ))}
            </motion.nav>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function MenuLink({
  item,
  isActive,
  align = "end",
  onNavigate,
}: {
  item: (typeof menuLinks)[number];
  isActive: boolean;
  align?: "end" | "center";
  onNavigate: () => void;
}) {
  const activeSize =
    align === "center"
      ? menuTokens.activeSizeMobile
      : menuTokens.activeSize;

  const linkClassName = `group block font-[family-name:var(--font-display)] uppercase text-cream transition ${
    align === "center" ? "text-center" : "text-right"
  } ${
    isActive
      ? "border-b border-cream"
      : "border-b border-transparent hover:border-cream"
  }`;

  const linkStyle = {
    fontSize: isActive ? activeSize : menuTokens.itemSize,
    lineHeight: menuTokens.lineHeight,
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: align === "center" ? 0 : 20, y: align === "center" ? 12 : 0 },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {item.href === "#contact" ? (
        <ContactCtaLink
          ctaName={ctaNames.navContact}
          href={item.href}
          onClick={onNavigate}
          className={linkClassName}
          style={linkStyle}
        >
          {item.label}
        </ContactCtaLink>
      ) : (
        <Link
          href={item.href}
          onClick={onNavigate}
          className={linkClassName}
          style={linkStyle}
        >
          {item.label}
        </Link>
      )}
    </motion.div>
  );
}
