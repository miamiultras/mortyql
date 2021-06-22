import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql,
  useQuery,
} from "@apollo/client";
import styles from "./App.module.scss";
import { Navbar } from "./components";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

const RICKS = gql`
  query {
    characters(page: 2, filter: { name: "rick" }) {
      info {
        count
      }
      results {
        name
      }
    }
  }
`;

function Ricks() {
  const { loading, error, data } = useQuery(RICKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { characters } = data;
  return characters.results.map(({ name }: { name: string }, index: number) => (
    <div key={index}>
      <p>{name}</p>
    </div>
  ));
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div className={styles.container}>
        <Navbar />
        <Ricks />
      </div>
    </ApolloProvider>
  );
}

export default App;
