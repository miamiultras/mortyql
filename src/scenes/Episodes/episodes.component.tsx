import { gql, useQuery } from "@apollo/client";

import { ErrorContainer, Spinner, Table } from "../../components";
import { ITableColumn } from "../../interfaces";
import styles from "./episodes.module.scss";

export interface IEpisode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

export const GET_EPISODES_QUERY = gql`
  query {
    episodes: episodesByIds(ids: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]) {
      id
      name
      air_date
      episode
    }
  }
`;

const columns: ITableColumn<IEpisode>[] = [
  {
    title: "No.",
    render: ({ id }) => <span>{id}</span>,
  },
  {
    title: "Code",
    render: ({ episode }) => <span>{episode}</span>,
  },
  {
    title: "Title",
    render: ({ name }) => <span>{name}</span>,
  },
  {
    title: "Airdate",
    render: ({ air_date }) => <span>{air_date}</span>,
  },
];

export function Episodes() {
  const { loading, error, data } = useQuery(GET_EPISODES_QUERY);
  const episodes: IEpisode[] = data?.episodes || [];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>List of episodes</h1>
      {loading ? (
        <Spinner />
      ) : !error ? (
        <div className={styles.tableContainer}>
          <h3>Season 1</h3>
          <Table columns={columns} data={episodes} />
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
