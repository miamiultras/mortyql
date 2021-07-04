import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { ITableColumn } from "../../interfaces";
import { Table } from "./table.component";

const mockData = [{ name: "Test data1" }, { name: "Test data2" }];

const mockColumns: ITableColumn<any>[] = [
  {
    title: "Test header1",
    render: ({ name }) => <span>{name}</span>,
  },
];

describe("Table", () => {
  test("renders content of the table without error", () => {
    render(
      <MemoryRouter>
        <Table columns={mockColumns} data={mockData} />
      </MemoryRouter>
    );
    expect(screen.getByRole("table")).toBeInTheDocument();

    expect(
      screen.getByRole("columnheader", { name: "Test header1" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("cell", { name: "Test data1" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("cell", { name: "Test data2" })
    ).toBeInTheDocument();
  });
});
