import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: {
      // Point vers ton Swagger JSON/YAML
      target: "http://localhost:3000/doc-json", // Adjust URL
    },
    output: {
      mode: "tags-split", // Creates one file per controller tag
      target: "api/endpoints",
      client: "react-query",
      mock: false,
      clean: true,
      prettier: true,
      override: {
        mutator: {
          path: "api/client.ts",
          name: "customInstance",
        },
      },
    },
  },
});
