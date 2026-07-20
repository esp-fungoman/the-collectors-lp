"use client";

import { useId } from "react";

/** Light-beam path overlay — paths from thecollectors.vn map1-line (viewBox 2500×1500). */

type MapLightBeamProps = {
  /** Match Next/Image object-position: left-top vs center */
  align?: "left-top" | "center";
  className?: string;
};

const LINE_1 =
  "M1679.918,1239.024c0,0-71.161-341.826-94.749-458.366 c-1.661-8.206-4.436-27.584-1.077-33.475c11.76-20.626,22.014-48.133,22.014-48.133s38.598-95.266,29.121-176.743 c-0.841-7.228-17.547-43.844-12.002-58.817c9.309-25.135,23.804-70.053,20.711-93.24c-5.036-37.765-25.811-77.799-47.728-129.506 c-27.418-64.687-48.421-114.24-67.711-162.294";

const LINE_2 =
  "M1066.511,849.979l134.946,3.895 c15.715-8.46,40.788-31.767,57.141-31.835c12.746-0.054,33.577,18.298,44.746,24.439c22.828,12.554,57.063,15.118,73.262,7.396 c8.98-4.281,88.406-47.889,88.406-47.889l110.268-19.991";

export function MapLightBeam({
  align = "center",
  className = "",
}: MapLightBeamProps) {
  const reactId = useId();
  const gradientId = `map-comet-${reactId.replace(/:/g, "")}`;
  const preserve =
    align === "left-top" ? "xMinYMin meet" : "xMidYMid meet";

  return (
    <svg
      className={`map-light-beam pointer-events-none absolute inset-0 h-full w-full ${className}`.trim()}
      viewBox="0 0 2500 1500"
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
      <path
        className="map-light-beam__line"
        fill="none"
        stroke={`url(#${gradientId})`}
        d={LINE_1}
      />
      <path
        className="map-light-beam__line2"
        fill="none"
        stroke={`url(#${gradientId})`}
        d={LINE_2}
      />
    </svg>
  );
}
