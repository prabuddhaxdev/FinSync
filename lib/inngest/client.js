import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "finsync", // Unique app ID
  name: "Finsync Finance Platform",
  retryFunction: async (attempt) => ({
    delay: Math.pow(2, attempt) * 1000, // Exponential backoff
    maxAttempts: 2,
  }),
});
