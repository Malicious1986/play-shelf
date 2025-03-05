import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:5050/graphql", // Replace with your backend GraphQL URL
  documents: "src/graphql/**/*.graphql", // ✅ Make sure it matches your .gql file locations
  generates: {
    "src/graphql/types.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo"
      ],
      config: {
        withHooks: true,       // ✅ Enables `useQuery` and `useMutation`
        withComponent: false,  // ❌ Not needed for functional components
        withHOC: false,        // ❌ Disable higher-order components
        addDocBlocks: true     // ✅ Adds JSDoc comments to improve IntelliSense
      }
    }
  }
};

export default config;
