import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:5050/graphql",
  documents: "src/graphql/**/*.graphql",
  generates: {
    "src/graphql/types.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
        withComponent: false,
        withHOC: false,
        addDocBlocks: true,
      },
    },
  },
};

export default config;
