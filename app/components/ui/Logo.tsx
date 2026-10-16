import Image from "next/image";
import styles from "./Logo.module.css";

interface LogoProps {
  iconOnly?: boolean;
  iconSize?: number;
  fontSize?: number;
  light?: boolean;
  className?: string;
}

export default function Logo({ iconOnly = false, iconSize = 36, fontSize = 22, light = false, className }: LogoProps) {
  return (
    <span className={`${styles.logo} ${className || ""}`}>
      <Image
        src="/assets/logo-icon.png"
        alt="ResourceFull"
        width={iconSize}
        height={iconSize}
        className={styles.icon}
        priority
      />
      {!iconOnly && (
        <span className={`${styles.wordmark} ${light ? styles.wordmarkLight : ""}`} style={{ fontSize }}>
          Resourcefull
        </span>
      )}
    </span>
  );
}
