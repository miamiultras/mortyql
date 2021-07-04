import { gql, useQuery } from "@apollo/client";

import { ErrorContainer, Spinner, Table } from "../../components";
import { ITableColumn } from "../../interfaces";
import styles from "./locations.module.scss";

export interface ILocation {
  id: number;
  name: string;
  type: string;
  dimension: string;
}

export const GET_LOCATIONS_QUERY = gql`
  query {
    locations {
      results {
        id
        name
        type
        dimension
      }
    }
  }
`;

const columns: ITableColumn<ILocation>[] = [
  {
    title: "No.",
    render: ({ id }) => <span>{id}</span>,
  },
  {
    title: "Name",
    render: ({ name }) => <span>{name}</span>,
  },
  {
    title: "Type",
    render: ({ type }) => <span>{type}</span>,
  },
  {
    title: "Dimension",
    render: ({ dimension }) => <span>{dimension}</span>,
  },
];

export function Locations() {
  const { loading, error, data } = useQuery(GET_LOCATIONS_QUERY);
  const locations: ILocation[] = data?.locations?.results || [];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>List of locations</h1>
      {loading ? (
        <Spinner />
      ) : !error ? (
        <div className={styles.tableContainer}>
          <Table columns={columns} data={locations} />
        </div>
      ) : (
        <ErrorContainer className={styles.errorContainer}>
          <h2>Something went wrong.</h2>
          <p>Try changing the query.</p>
        </ErrorContainer>
      )}
    </div>
  );
}
