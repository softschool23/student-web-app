import Image from "next/image";
import Link from "next/link";
import { cn } from "@/src/lib/utils";

type LogoSize = "sm" | "md" | "lg" | "xl";

interface LogoProps {
  className?: string;
  size?: LogoSize;
  width?: number;
  height?: number;
  priority?: boolean;
  href?: string;
  clickable?: boolean;
  /** School logo URL from the API. Falls back to the default logo if not provided. */
  logoUrl?: string;
  /** Alt text for the logo image. Defaults to "School Logo". */
  alt?: string;
}

const sizeClasses: Record<LogoSize, { width: number; height: number }> = {
  sm: { width: 64, height: 21 },
  md: { width: 96, height: 32 },
  lg: { width: 120, height: 40 },
  xl: { width: 160, height: 53 },
};

const Logo = ({
  className,
  size = "md",
  width,
  height,
  priority = false,
  href = "/",
  clickable = false,
  logoUrl,
  alt = "School Logo",
}: LogoProps) => {
  const dimensions = {
    width: width || sizeClasses[size].width,
    height: height || sizeClasses[size].height,
  };

  const src = logoUrl || "/logo.png";

  const logoImage = (
    <Image
      src={src}
      alt={alt}
      width={dimensions.width}
      height={dimensions.height}
      priority={priority}
      className={cn(
        "object-contain",
        "transition-opacity duration-200",
        clickable && "hover:opacity-80 cursor-pointer",
      )}
    />
  );

  const logoContainer = (
    <div className={cn("flex items-center justify-center", className)}>
      {logoImage}
    </div>
  );

  if (clickable) {
    return (
      <Link href={href} className="inline-block">
        {logoContainer}
      </Link>
    );
  }

  return logoContainer;
};

export default Logo;
