import { ReactNode } from "react";
import classNames from "classnames";

import styles from "./card.module.scss";

interface ICard {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: ICard) {
  return <div className={classNames(styles.card, className)}>{children}</div>;
}
