import styles from "./Header.module.css";
import smHero from "../../assets/hero-sm.png";
import lgHero from "../../assets/hero-lg.png";
import logo from "../../assets/Logo.svg";

export default function Header() {
  return (
    <header className={styles.header}>
      <img src={logo} alt="" className={styles.logo} />
    </header>
  );
}
