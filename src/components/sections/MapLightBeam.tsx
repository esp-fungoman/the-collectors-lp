"use client";

import { useId, useLayoutEffect, useRef } from "react";

/**
 * Light beams from Figma (map-horizontal / map-vertical / map-round)
 * placed in map-1.svg space (1087×622). Tune *_X / *_Y to align.
 */

type MapLightBeamProps = {
  align?: "left-top" | "center";
  className?: string;
};

const MAP_W = 1087;
const MAP_H = 622;

/** map-horizontal.svg viewBox 0 0 305 48 */
const HORIZONTAL_X = 490;
const HORIZONTAL_Y = 308;
const HORIZONTAL_D =
  "M0.0393066 41.309L82.6309 42.9284C91.2189 36.058 109.808 22.7589 115.462 24.5256C121.115 26.2923 138.768 36.2411 146.888 40.9947C154.467 44.7843 174.221 49.4124 192.605 37.6082C211.375 27.1421 229.244 18.1034 235.832 14.8922L304.244 1.96533";

/** map-vertical.svg viewBox 0 0 94 684 — open edge for comet only */
const VERTICAL_X = 763;
const VERTICAL_Y = -106;
const VERTICAL_STROKE_D =
  "M0 2.17073C35.3611 91.1389 47.5489 119.379 58.5969 144.887C62.8233 154.647 67.1122 166.101 67.4707 176.547C67.7982 186.236 64.4765 194.919 61.4356 204.303L55.1665 223.44C53.5987 228.21 53.7086 233.379 55.5408 238.056C58.0437 244.465 61.3736 255.537 62.4807 270.988C64.1883 294.841 60.7806 334.316 34.8933 386.885C31.5248 393.716 30.5113 401.602 32.0242 409.09L88.1183 683.951";

/** Full closed map-round path — comet runs the whole loop (WAAPI for seamless) */
const ROUND_X = 715;
const ROUND_Y = 298;
const ROUND_D =
  "M74.4075 3.20532L77.6672 24.3167L77.8225 25.3235L76.9436 25.8391L26.3157 55.5481L24.9583 56.344L24.2278 54.9504L3.26782 14.9436L2.2981 13.093L4.36255 12.7659L72.6907 1.95239L74.178 1.71704L74.4075 3.20532Z";

/** Set true only while nudging *_X / *_Y */
const STATIC_ALIGN = false;

export function MapLightBeam({
  align = "center",
  className = "",
}: MapLightBeamProps) {
  const reactId = useId();
  const gradientId = `map-comet-${reactId.replace(/:/g, "")}`;
  const preserve = align === "left-top" ? "xMinYMin meet" : "xMidYMid meet";
  const logoRef = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    if (STATIC_ALIGN) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const el = logoRef.current;
    if (!el || typeof el.getTotalLength !== "function") return;

    const len = el.getTotalLength();
    if (!len) return;

    const dash = Math.max(28, len * 0.22);
    const gap = len;
    el.style.strokeDasharray = `${dash} ${gap}`;
    el.style.strokeDashoffset = "0";

    const anim = el.animate(
      [{ strokeDashoffset: 0 }, { strokeDashoffset: -(dash + gap) }],
      { duration: 2800, iterations: Infinity, easing: "linear" },
    );

    return () => anim.cancel();
  }, []);

  return (
    <svg
      className={`map-light-beam pointer-events-none absolute inset-0 h-full w-full${STATIC_ALIGN ? " map-light-beam--static" : ""} ${className}`.trim()}
      viewBox={`0 0 ${MAP_W} ${MAP_H}`}
      preserveAspectRatio={preserve}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF6F40" stopOpacity={0} />
          <stop offset="70%" stopColor="#FF6F40" stopOpacity={0.8} />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity={1} />
        </linearGradient>
      </defs>

      <g transform={`translate(${VERTICAL_X} ${VERTICAL_Y})`}>
        <path
          className="map-light-beam__line"
          fill="none"
          stroke={`url(#${gradientId})`}
          d={VERTICAL_STROKE_D}
        />
      </g>

      <g transform={`translate(${HORIZONTAL_X} ${HORIZONTAL_Y})`}>
        <path
          className="map-light-beam__line2"
          fill="none"
          stroke={`url(#${gradientId})`}
          d={HORIZONTAL_D}
        />
      </g>

      <g transform={`translate(${ROUND_X} ${ROUND_Y})`}>
        <path
          ref={logoRef}
          className="map-light-beam__logo"
          fill="none"
          stroke="#ffc107"
          d={ROUND_D}
        />
      </g>
    </svg>
  );
}
