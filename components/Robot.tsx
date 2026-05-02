import type { CSSProperties } from "react";

export const ROBOT_W = 44;
export const ROBOT_H = 62;
const FOOT_DOWN = 44;
const FOOT_UP = 41;

type Props = {
  /** -1 to flip the body to face left. */
  facing?: 1 | -1;
  /** Pixel offset both eyes shift; clamp -1.2..1.2 in the caller. */
  eyeOffset?: { x: number; y: number };
  /** Toggles the foot stride; usually 0 or 1. */
  stride?: 0 | 1;
  walking?: boolean;
  /** Visually tilts the body (for grab/drop animations). */
  tiltDeg?: number;
  width?: number;
  height?: number;
  style?: CSSProperties;
};

/**
 * A small dark robot with a pink cone hat. Self-contained SVG sprite shared
 * between the RoamPet and the PathChooser scene so they look like the same
 * character.
 */
export default function Robot({
  facing = 1,
  eyeOffset = { x: 0, y: 0 },
  stride = 0,
  walking = false,
  tiltDeg = 0,
  width = ROBOT_W,
  height = ROBOT_H,
  style,
}: Props) {
  const leftY = walking ? (stride === 0 ? FOOT_UP : FOOT_DOWN) : FOOT_DOWN;
  const rightY = walking ? (stride === 0 ? FOOT_DOWN : FOOT_UP) : FOOT_DOWN;
  return (
    <svg
      viewBox="0 0 40 56"
      width={width}
      height={height}
      style={{
        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.45))",
        transform: `scaleX(${facing}) rotate(${tiltDeg}deg)`,
        transformOrigin: "50% 80%",
        ...style,
      }}
    >
      {/* tip pom-pom */}
      <circle cx="20" cy="3" r="2" fill="#ffd6e2" />
      {/* cone hat */}
      <polygon points="20,5 27.5,18 12.5,18" fill="#ec4899" />
      <rect x="12.5" y="17" width="15" height="2.5" rx="1" fill="#9d174d" />

      {/* body */}
      <rect
        x="8"
        y="19"
        width="24"
        height="26"
        rx="4"
        fill="#101015"
        stroke="#2a2a35"
        strokeWidth="1"
      />
      <rect x="9" y="20" width="22" height="3" rx="2" fill="#1f1f2c" />
      {/* belly screen */}
      <rect
        x="11.5"
        y="32"
        width="17"
        height="6"
        rx="1.5"
        fill="#0a0a14"
        stroke="#2a2a35"
        strokeWidth="0.6"
      />
      <rect x="13" y="34" width="2" height="2" fill="#a3e635" />
      <rect x="16" y="34" width="2" height="2" fill="#22d3ee" />
      <rect x="19" y="34" width="2" height="2" fill="#ff2bd6" />
      <rect x="22" y="34" width="2" height="2" fill="#fbbf24" />

      {/* eye sockets */}
      <rect
        x={11 + eyeOffset.x}
        y={24 + eyeOffset.y}
        width="6"
        height="5"
        rx="1"
        fill="#FFFFFF"
      />
      <rect
        x={23 + eyeOffset.x}
        y={24 + eyeOffset.y}
        width="6"
        height="5"
        rx="1"
        fill="#FFFFFF"
      />
      {/* pupils */}
      <rect
        x={13 + eyeOffset.x * 1.3}
        y={25 + eyeOffset.y * 1.3}
        width="2"
        height="3"
        fill="#0a0a14"
      />
      <rect
        x={25 + eyeOffset.x * 1.3}
        y={25 + eyeOffset.y * 1.3}
        width="2"
        height="3"
        fill="#0a0a14"
      />

      {/* feet */}
      <rect
        x="10"
        y={leftY}
        width="6"
        height="6"
        rx="1.5"
        fill="#101015"
        stroke="#2a2a35"
        strokeWidth="1"
      />
      <rect
        x="24"
        y={rightY}
        width="6"
        height="6"
        rx="1.5"
        fill="#101015"
        stroke="#2a2a35"
        strokeWidth="1"
      />
    </svg>
  );
}
