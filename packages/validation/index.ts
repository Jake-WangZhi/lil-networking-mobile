import { z } from "zod";

export const createContactPayloadSchema = z.object({
  firstName: z.string(),
  lastName: z.string().optional(),
  title: z.string().optional(),
  company: z.string().optional(),
  goalDays: z.number(),
  email: z.string().optional(),
  phone: z.string().optional(),
  linkedInUrl: z.string().optional(),
  location: z.string().optional(),
  links: z.array(z.string()),
  tags: z.array(z.string()),
});

export const ActionSchema = z.object({
  contactId: z.string(),
  contactFirstName: z.string(),
  contactLastName: z.string().nullable(),
  days: z.number(),
  goalDays: z.number(),
  title: z.string().nullable(),
  isNewUser: z.boolean(),
});

export type Action = z.infer<typeof ActionSchema>;
