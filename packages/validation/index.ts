import { z } from "zod";

export const createContactPayloadSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  title: z.string(),
  company: z.string(),
  goalDays: z.number(),
  email: z.string(),
  phone: z.string(),
  linkedInUrl: z.string(),
  location: z.string(),
  links: z.array(z.string()),
  tags: z.array(z.string()),
});
