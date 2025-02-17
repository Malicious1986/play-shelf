import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const API_URL = import.meta.env.VITE_GRAPHQL_API;

const client = new ApolloClient({
  link: new HttpLink({ uri: API_URL, credentials: "include" }),
  cache: new InMemoryCache(),
});

export default client;
