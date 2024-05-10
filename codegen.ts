
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://server-twitter-1.onrender.com/graphql",
  documents: "**/*.{tsx,ts}",
  generates: {
    "gql/": {
      preset: "client",
      plugins: []
    },
    "./graphql.schema.json": {
      plugins: ["introspection"]
    }
  }
};


// import type { CodegenConfig } from '@graphql-codegen/cli';

// const config: CodegenConfig = {
//   overwrite: true,
//   schema: "http://localhost:8000/graphql",
//   documents: "**/*.{tsx,ts}",
//   generates: {
//     "gql/": {
//       preset: "client",
//       plugins: []
//     },
//     "./graphql.schema.json": {
//       plugins: ["introspection"]
//     }
//   }
// };

export default config;

