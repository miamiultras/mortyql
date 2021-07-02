import classNames from "classnames";

import styles from "./error-container.module.scss";

interface IErrorContainer {
  children: React.ReactNode;
  className?: string;
}

export function ErrorContainer({ children, className }: IErrorContainer) {
  return (
    <div
      data-testid="error-container"
      className={classNames(styles.container, className)}
    >
      {children}
    </div>
  );
}
