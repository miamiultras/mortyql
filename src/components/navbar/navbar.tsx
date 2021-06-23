import { useState } from "react";
import classNames from "classnames";
import { ReactComponent as Hamburger } from "./hamburger.svg";
import styles from "./navbar.module.scss";

const MOCK_MENU_ITEMS = [
  { id: 1, name: "Characters", active: true },
  { id: 2, name: "Episodes", active: false },
  { id: 3, name: "Locations", active: false },
];

export function Navbar() {
  const [overlay, setOverlay] = useState(false);
  return (
    <div className={styles.navbar}>
      <nav>
        <h2 className={styles.logo}>mortyQL 🧪</h2>
      </nav>
      {overlay ? (
        <button
          className={styles.menuCloseButton}
          onClick={() => setOverlay(false)}
        >
          <span />
        </button>
      ) : (
        <Hamburger
          onClick={() => setOverlay(true)}
          className={styles.hamburger}
        />
      )}

      <div
        className={classNames(styles.overlay, {
          [styles.overlayVisible]: overlay,
        })}
      >
        <ul className={styles.menu}>
          {MOCK_MENU_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                aria-current="page"
                className={classNames(styles.menuItem, {
                  [styles.menuItemActive]: item.active,
                })}
                href="/"
              >
                <span className={styles.menuItemText}>{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
