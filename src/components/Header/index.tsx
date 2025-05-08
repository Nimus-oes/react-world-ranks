import styles from "./Header.module.css";
import logo from "../../assets/hero-image.jpg";

export default function Header() {
  return (
    <header className={styles.header}>
      <div>
        <img src={logo} alt="" />
      </div>
    </header>
  );
}
