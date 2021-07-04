import { ReactNode } from "react";

export interface ITableColumn<T> {
  title: string;
  render: (rowData: T) => ReactNode;
}
