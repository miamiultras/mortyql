import { ReactNode } from "react";
import classNames from "classnames";

import styles from "./card.module.scss";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return <div className={classNames(styles.card, className)}>{children}</div>;
}
