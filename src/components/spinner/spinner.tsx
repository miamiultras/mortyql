import styles from "./spinner.module.scss";

export function Spinner() {
  return (
    <div data-testid="spinner" className={styles.spinnerWrapper}>
      <div className={styles.spinner} />
    </div>
  );
}
