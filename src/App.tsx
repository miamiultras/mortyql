import { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const { data, loading } = await client.query({
        query: gql`
          query {
            characters(page: 2, filter: { name: "rick" }) {
              info {
                count
              }
              results {
                name
              }
            }
            location(id: 1) {
              id
            }
            episodesByIds(ids: [1, 2]) {
              id
            }
          }
        `,
      });
      setData(data);
      setLoading(loading);
    }
    fetchData();
  }, []);
  return (
    <>{loading ? "Loading..." : <pre>{JSON.stringify(data, null, 4)}</pre>}</>
  );
}

export default App;
