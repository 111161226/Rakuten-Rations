// prisma.config.ts
import "dotenv/config"; // これで環境変数を自動ロード
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    // seedコマンドはここに移ります
    seed: "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts",
  },
});