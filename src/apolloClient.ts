import { ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { Observable } from "@apollo/client/utilities";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

const API_URL = import.meta.env.VITE_API;
const GQL_API_URL = `${API_URL}/graphql`;

const uploadLink = createUploadLink({
  uri: GQL_API_URL,
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Handle Expired Access Token & Refresh It
const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.extensions?.code === "UNAUTHENTICATED") {
        return new Observable(observer => {
          fetch(`${API_URL}/refresh-token`, {
            method: "POST",
            credentials: "include",
          })
            .then((res) => res.json())
            .then(({ accessToken }) => {
              localStorage.setItem("token", accessToken);

              operation.setContext(({ headers = {} }) => ({
                headers: {
                  ...headers,
                  authorization: `Bearer ${accessToken}`,
                },
              }));

              forward(operation).subscribe({
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer),
              });
            })
            .catch(error => {
              observer.error(error);
            });
        });
      }
    }
  }
});

const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(uploadLink)),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          games: {
            // Disables automatic keying by arguments (like page numbers or cursors)
            keyArgs: (args)  => {
              if(args?.category === 'All') {
                return false
              }
              return ['category'];
            },
            // The merge function defines how to combine incoming paginated results with the existing cache
              merge(existing = { games: [], hasMore: true }, incoming) {
              return {
                games: [...existing.games, ...incoming.games],
                hasMore: incoming.hasMore,
              };
            },
          },
        },
      },
    },
  }),
});

export default client;
