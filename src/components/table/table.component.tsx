import { ReactNode } from "react";
import classNames from "classnames";

import { ITableColumn } from "../../interfaces";
import styles from "./table.module.scss";

interface ITable<T> {
  columns: ITableColumn<T>[];
  data: T[];
  emptyState?: ReactNode | string;
  className?: string;
}

export function Table<T>({
  columns,
  data,
  emptyState = "No data",
  className,
}: ITable<T>) {
  if (!data || !data.length) return <div>{emptyState}</div>;
  return (
    <table className={classNames(styles.table, className)}>
      <thead>
        <tr>
          {columns.map((columnItem) => (
            <th key={columnItem.title}>{columnItem.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((item, index) => (
          <tr key={index}>
            {columns.map((col, key) => (
              <td key={key}>{col.render(item)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
