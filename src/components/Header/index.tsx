import styles from "./Header.module.css";
import logo from "../../assets/Logo.svg";

export default function Header() {
  return (
    <header className={styles.header}>
      <img
        src={logo}
        alt="A logo image of World Ranks"
        className={styles.logo}
      />
    </header>
  );
}
