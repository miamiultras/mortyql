import { useEffect, useRef, useState } from "react";
import { gql, useQuery } from "@apollo/client";

import { Card, Search, Spinner, ErrorContainer } from "../../components";
import { useIntersect } from "../../lib";
import styles from "./characters.module.scss";

export interface ICharacter {
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
}

export const GET_CHARACTERS_QUERY = gql`
  query Characters($query: String!, $page: Int!) {
    characters(page: $page, filter: { name: $query }) {
      results {
        name
        status
        species
        type
        gender
        image
      }
      info {
        count
      }
    }
  }
`;

export function Characters() {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery(GET_CHARACTERS_QUERY, {
    variables: { query, page },
  });

  const lastCardElementRef = useRef(null);
  const setNode = useIntersect({}, () => setPage((page) => page + 1));

  useEffect(() => {
    async function fetchData() {
      if (data?.characters?.results) {
        const newCharacters = await data.characters.results;
        setCharacters((characters) => [...characters, ...newCharacters]);
        lastCardElementRef.current && setNode(lastCardElementRef.current);
      }
    }
    fetchData();
  }, [loading, error, data, setNode]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Characters</h1>
      <Search setQuery={setQuery} />
      {!error ? (
        <div className={styles.resultsContainer}>
          {characters.map(
            (
              { name, status, species, type, gender, image }: ICharacter,
              index: number
            ) => {
              const isLastElement = characters.length === index + 1;
              return (
                <div
                  key={index}
                  ref={isLastElement ? lastCardElementRef : null}
                >
                  <Card className={styles.card}>
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
                </div>
              );
            }
          )}
        </div>
      ) : (
        <ErrorContainer className={styles.errorContainer}>
          <h2>Something went wrong.</h2>
          <h4>Try changing the query.</h4>
        </ErrorContainer>
      )}
      {loading && (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      )}
    </div>
  );
}
