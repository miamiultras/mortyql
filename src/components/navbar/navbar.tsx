import styles from "./navbar.module.scss";

export function Navbar() {
  return (
    <div className={styles.navbar}>
      <nav>
        <h2 className={styles.logo}>mortyQL 🧪</h2>
      </nav>
    </div>
  );
}
