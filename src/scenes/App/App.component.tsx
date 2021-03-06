import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import { Navbar } from "../../components";
import styles from "./App.module.scss";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

interface IApp {
  children: React.ReactNode;
}

export function App({ children }: IApp) {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <div className={styles.container}>{children}</div>
    </ApolloProvider>
  );
}

export default App;
