import styles from "./Header.module.css";
import smLogo from "../../assets/hero-sm.png";
import lgLogo from "../../assets/hero-lg.png";

export default function Header() {
  return (
    <header className={styles.header}>
      <picture>
        <source media="(min-width: 1024px)" srcSet={lgLogo} />
        <img src={smLogo} />
      </picture>
    </header>
  );
}
