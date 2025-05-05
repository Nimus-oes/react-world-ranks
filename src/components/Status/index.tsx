import styles from "./Status.module.css";

export default function Status() {
  return (
    <div>
      <p>Status</p>
      <div className={styles.statusWrapper}>
        <input type="checkbox" />
        <input type="checkbox" />
      </div>
    </div>
  );
}
