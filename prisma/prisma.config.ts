import * as dotenv from "dotenv";
dotenv.config();

export default {
  schema: "./prisma/schema.prisma",
  seed: {
    run: async () => {
      await import("./seed.js"); // ✅ correct relative path
    },
  },
};
