import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const apiKey = `${env.VITE_API_KEY ?? ""}`;

  return {
    apiKey,
    base: "/weather-app/",
  };
});
