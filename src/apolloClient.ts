import { ApolloClient, InMemoryCache } from "@apollo/client";
import  createUploadLink from "apollo-upload-client/createUploadLink.mjs"; // ✅ Use deep import

const API_URL = import.meta.env.VITE_GRAPHQL_API; // Ensure this is set

const client = new ApolloClient({
  link: createUploadLink({
    uri: API_URL, // ✅ Set API URL
    credentials: "include", // ✅ Allow cookies/sessions
  }),
  cache: new InMemoryCache(),
});

export default client;
