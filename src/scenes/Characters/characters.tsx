import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

import { Card, Search, Spinner } from "../../components";
import styles from "./characters.module.scss";

export type Character = {
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
};

export const GET_CHARACTERS_QUERY = gql`
  query Characters($searchQuery: String!){
    characters(filter: { name: $searchQuery }) {
      results {
        name
        status
        species
        type
        gender
        image
      }
    }
  }
`;

export function Characters() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { loading, error, data } = useQuery(GET_CHARACTERS_QUERY, {
    variables: { searchQuery },
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Characters</h1>
      <Search setQuery={setSearchQuery} />
      {}
      {loading ? (
        <Spinner />
      ) : !error ? (
        <div className={styles.resultsContainer}>
          {data?.characters?.results.map(
            (
              { name, status, species, type, gender, image }: Character,
              index: number
            ) => (
              <Card className={styles.card} key={index}>
                <div className={styles.details}>
                  <span className={styles.name}>{name}</span>
                  <p>
                    <span className={styles.label}>Status: </span>
                    {status}
                  </p>
                  <p>
                    <span className={styles.label}>Species: </span>
                    {species}
                  </p>
                  <p>
                    <span className={styles.label}>Type: </span>
                    {type || "N/A"}
                  </p>
                  <p>
                    <span className={styles.label}>Gender: </span>
                    {gender}
                  </p>
                </div>
                <img className={styles.image} src={image} alt={name} />
              </Card>
            )
          )}
        </div>
      ) : (
        <div className={styles.error}>
          <h2>Something went wrong.</h2>
          <p>Try changing the query.</p>
        </div>
      )}
    </div>
  );
}
