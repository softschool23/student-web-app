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
}

const sizeClasses: Record<LogoSize, { width: number; height: number }> = {
  sm: { width: 64, height: 21 }, // ~20% smaller for mobile
  md: { width: 96, height: 32 }, // ~20% smaller for mobile
  lg: { width: 120, height: 40 }, // ~20% smaller for mobile
  xl: { width: 160, height: 53 }, // ~20% smaller for mobile
};

const Logo = ({
  className,
  size = "md",
  width,
  height,
  priority = false,
  href = "/",
  clickable = false,
}: LogoProps) => {
  const dimensions = {
    width: width || sizeClasses[size].width,
    height: height || sizeClasses[size].height,
  };

  const logoImage = (
    <Image
      src="/logo.png"
      alt="OneVerify Logo"
      width={dimensions.width}
      height={dimensions.height}
      priority={priority}
      className={cn(
        "object-contain",
        "transition-opacity duration-200",
        clickable && "hover:opacity-80 cursor-pointer"
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
