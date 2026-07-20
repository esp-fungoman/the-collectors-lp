import type { PanInfo } from "framer-motion";

/** Distance (px) or velocity needed to commit a swipe. */
const OFFSET_THRESHOLD = 50;
const VELOCITY_THRESHOLD = 400;

/**
 * Call from framer-motion `onDragEnd`. Returns `1` (next), `-1` (prev), or `0`.
 * Swipe left → next; swipe right → previous.
 */
export function swipeDirection(
  offsetX: number,
  velocityX: number,
): -1 | 0 | 1 {
  if (offsetX < -OFFSET_THRESHOLD || velocityX < -VELOCITY_THRESHOLD) return 1;
  if (offsetX > OFFSET_THRESHOLD || velocityX > VELOCITY_THRESHOLD) return -1;
  return 0;
}

export function onSwipeEnd(
  info: PanInfo,
  paginate: (dir: number) => void,
): void {
  const dir = swipeDirection(info.offset.x, info.velocity.x);
  if (dir !== 0) paginate(dir);
}
