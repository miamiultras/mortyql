import { gql, useQuery } from "@apollo/client";

const RICKS = gql`
  query {
    characters {
      results {
        name
        image
      }
    }
  }
`;

export function Characters() {
  const { loading, error, data } = useQuery(RICKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { characters } = data;
  return (
    <>
      <h1>Characters</h1>
      {characters.results.map(({ name }: { name: string }, index: number) => (
        <div key={index}>
          <p>{name}</p>
        </div>
      ))}
      ;
    </>
  );
}
