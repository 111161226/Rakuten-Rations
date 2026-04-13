import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    // ts-node よりも、最近の環境では npx tsx が推奨されています
    seed: "npx tsx prisma/seed.ts",
  },
  datasource: {
    // env() ヘルパーではなく process.env を直接参照する
    url: process.env.POSTGRES_PRISMA_URL || "", 
  },
});