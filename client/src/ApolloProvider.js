import React from "react";
import App from "./App";
import ApolloClient from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider, InMemoryCache } from "@apollo/client";
import { setContext } from "apollo-link-context";
import { API_URI } from "./config";

const cache = new InMemoryCache();

const httpLink = createHttpLink({
  uri: API_URI,
});

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
