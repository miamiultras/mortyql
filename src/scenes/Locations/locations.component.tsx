import { gql, useQuery } from "@apollo/client";

import { ErrorContainer, Spinner } from "../../components";
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

export function Locations() {
  const { loading, error, data } = useQuery(GET_LOCATIONS_QUERY);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>List of locations</h1>
      {loading ? (
        <Spinner />
      ) : !error ? (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Type</th>
                <th>Dimension</th>
              </tr>
            </thead>
            <tbody>
              {data?.locations?.results.map(
                ({ id, name, type, dimension }: ILocation, index: number) => (
                  <tr key={id}>
                    <td>{++index}</td>
                    <td>{name}</td>
                    <td>{type}</td>
                    <td>{dimension}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
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
