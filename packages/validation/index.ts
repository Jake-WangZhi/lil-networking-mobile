import { z } from "zod";

export const CreateContactPayloadSchema = z.object({
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

export const ActionArraySchema = z.array(ActionSchema);

export type Action = z.infer<typeof ActionSchema>;

export const ActionType = {
  UPCOMING: "upcoming",
  PAST: "past",
} as const;

export type ActionType = (typeof ActionType)[keyof typeof ActionType];

export const ActionTypeSchema = z.nativeEnum(ActionType);

export const ContactArraySchema = z.array(
  z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string().nullable(),
    title: z.string().nullable(),
    tags: z.array(z.string()),
    isArchived: z.boolean(),
  })
);
