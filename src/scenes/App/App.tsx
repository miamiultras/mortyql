import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import { Navbar } from "../../components";
import styles from "./App.module.scss";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

export function App({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <div className={styles.container}>
        <Navbar />
        <main>{children}</main>
      </div>
    </ApolloProvider>
  );
}

export default App;
