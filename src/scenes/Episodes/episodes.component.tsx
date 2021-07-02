import { gql, useQuery } from "@apollo/client";

import { ErrorContainer, Spinner } from "../../components";
import styles from "./episodes.module.scss";

export type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
};

export const GET_EPISODES_QUERY = gql`
  query {
    episodesByIds(ids: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]) {
      id
      name
      air_date
      episode
    }
  }
`;

export function Episodes() {
  const { loading, error, data } = useQuery(GET_EPISODES_QUERY);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>List of episodes</h1>
      {loading ? (
        <Spinner />
      ) : !error ? (
        <div className={styles.tableContainer}>
          <h3>Season 1</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>No.</th>
                <th>Code</th>
                <th>Title</th>
                <th>AirDate</th>
              </tr>
            </thead>
            <tbody>
              {data?.episodesByIds.map(
                ({ id, name, air_date, episode }: Episode, index: number) => (
                  <tr key={id}>
                    <td>{++index}</td>
                    <td>{episode}</td>
                    <td>{name}</td>
                    <td>{air_date}</td>
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
