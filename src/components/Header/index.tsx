import styles from "./Header.module.css";
import logo from "../../assets/Logo.svg";

export default function Header() {
  return (
    <header className={styles.header}>
      <img src={logo} alt="" className={styles.logo} />
    </header>
  );
}
