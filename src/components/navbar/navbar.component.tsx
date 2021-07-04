import { useState } from "react";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";

import { ReactComponent as Hamburger } from "./hamburger.svg";
import styles from "./navbar.module.scss";

interface IMenuItem {
  id: number;
  name: string;
  to: string;
}

const MENU_ITEMS: IMenuItem[] = [
  { id: 1, name: "Characters", to: "/" },
  { id: 2, name: "Episodes", to: "/episodes" },
  { id: 3, name: "Locations", to: "/locations" },
];

export function Navbar() {
  const [overlay, setOverlay] = useState(false);
  const location = useLocation();

  return (
    <div className={styles.navbar}>
      <nav>
        <Link className={styles.logo} aria-current="page" to={"/"}>
          <h2>mortyQL 🧪</h2>
        </Link>
        <ul className={styles.navbarMenu} data-testid="menu">
          {MENU_ITEMS.map((item: IMenuItem) => (
            <li key={item.id}>
              <Link
                aria-current="page"
                className={classNames(styles.navbarMenuItem, {
                  [styles.navbarMenuItemActive]: location.pathname === item.to,
                })}
                to={item.to}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.menuIcon}>
        {overlay ? (
          <button
            data-testid="close-menu-icon"
            className={styles.menuCloseButton}
            onClick={() => setOverlay(false)}
          >
            <span />
          </button>
        ) : (
          <Hamburger
            data-testid="hamburger"
            onClick={() => setOverlay(true)}
            className={styles.hamburger}
          />
        )}
      </div>

      <div
        data-testid="overlay-menu"
        className={classNames(styles.overlay, {
          [styles.overlayVisible]: overlay,
        })}
      >
        <ul className={styles.menu}>
          {MENU_ITEMS.map((item: IMenuItem) => (
            <li key={item.id}>
              <Link
                onClick={() => setOverlay(false)}
                aria-current="page"
                className={classNames(styles.menuItem, {
                  [styles.menuItemActive]: location.pathname === item.to,
                })}
                to={item.to}
              >
                <span className={styles.menuItemText}>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
