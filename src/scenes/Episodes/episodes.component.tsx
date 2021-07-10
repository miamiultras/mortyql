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

// API doesn't allow to query by season...
export const GET_EPISODES_QUERY = gql`
  query {
    season1: episodesByIds(ids: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]) {
      id
      name
      air_date
      episode
    }
    season2: episodesByIds(ids: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21]) {
      id
      name
      air_date
      episode
    }
    season3: episodesByIds(ids: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31]) {
      id
      name
      air_date
      episode
    }
    season4: episodesByIds(ids: [32, 33, 34, 35, 36, 37, 38, 39, 40, 41]) {
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

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>List of episodes</h1>
      {loading ? (
        <Spinner />
      ) : !error ? (
        <>
          <div className={styles.tableContainer}>
            <h3>Season 1</h3>
            <Table columns={columns} data={data?.season1} />
          </div>
          <div className={styles.tableContainer}>
            <h3>Season 2</h3>
            <Table columns={columns} data={data?.season2} />
          </div>
          <div className={styles.tableContainer}>
            <h3>Season 3</h3>
            <Table columns={columns} data={data?.season3} />
          </div>
          <div className={styles.tableContainer}>
            <h3>Season 4</h3>
            <Table columns={columns} data={data?.season4} />
          </div>
        </>
      ) : (
        <ErrorContainer className={styles.errorContainer}>
          <h2>Something went wrong.</h2>
          <p>Try changing the query.</p>
        </ErrorContainer>
      )}
    </div>
  );
}
