import Image from "next/image";

type IconProps = {
  src: string;
  alt?: string;
  size?: number;
  className?: string;
};

export function Icon({ src, alt = "", size = 40, className = "" }: IconProps) {
  return (
    <span
      className={`relative inline-flex shrink-0 overflow-hidden ${className}`.trim()}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="size-full object-contain"
      />
    </span>
  );
}
