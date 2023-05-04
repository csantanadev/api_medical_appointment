import { defineConfig } from "vitest/config";
import dotenv from "dotenv";

// forçando para utilizar a env do BD de tests de e2e
dotenv.config({ path: ".env.test" });

export default defineConfig({
  plugins: [
    {
      name: "setup-config",
      config: () => ({
        test: {
          setupFiles: ["./test/setup.ts"],
        },
      }),
    },
  ],
  test: {
    include: ["**/*.e2e-spec.ts"], // testes e2e com -spec
    exclude: ["**/*.test.ts"], // testes unitarios com .test
  },
});
