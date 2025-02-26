import { z } from "zod";

const configSchema = z.object({
  NEXT_PUBLIC_API_ENDPOINT: z.string(),
  NEXT_PUBLIC_EMBED: z.string(),
  NEXT_PUBLIC_FACEBOOK_URL: z.string(),
  NEXT_PUBLIC_AI_ENDPOINT: z.string(),
});

const configProject = configSchema.safeParse({
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  NEXT_PUBLIC_EMBED: process.env.NEXT_PUBLIC_EMBED,
  NEXT_PUBLIC_FACEBOOK_URL: process.env.NEXT_PUBLIC_FACEBOOK_URL,
  NEXT_PUBLIC_AI_ENDPOINT: process.env.NEXT_PUBLIC_AI_ENDPOINT,
});
if (!configProject.success) {
  console.error(configProject.error.issues);
  throw new Error("The declared values in the .env file are invalid");
}

const envConfig = configProject.data;
export default envConfig;
