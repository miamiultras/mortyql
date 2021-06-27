import { gql, useQuery } from "@apollo/client";

import { Card, Spinner } from "../../components";
import styles from "./characters.module.scss";

type Character = {
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
};

const CHARACTERS = gql`
  query {
    characters {
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
  const { loading, error, data } = useQuery(CHARACTERS);

  if (loading) return <Spinner />;
  if (error) return <p>Error :(</p>;

  const { characters } = data;
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Characters</h1>
      {characters.results.map(
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
              <button className={styles.button}>View more</button>
            </div>
            <img className={styles.image} src={image} alt={name} />
          </Card>
        )
      )}
    </div>
  );
}
