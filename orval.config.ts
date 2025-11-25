import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: {
      target: "http://localhost:3000/doc-json",
    },
    output: {
      mode: "tags-split",
      client: "react-query",
      target: "api/endpoints",
      schemas: "api/models",
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
  apiZod: {
    input: {
      target: "http://localhost:3000/doc-json",
    },
    output: {
      mode: "tags-split",
      client: "zod",
      target: "api/zod",
      fileExtension: ".zod.ts", // Avoids conflicts
      clean: true,
      prettier: true,
    },
  },
});
