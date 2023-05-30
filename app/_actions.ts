"use server";

import * as db from "@/lib/prisma";
import { validateEmail, validatePhone } from "@/lib/utils";
import { redirect } from "next/navigation";

interface FormDataOptions {
  id: string;
  name: string;
  title: string;
  company: string;
  industry: string;
  goalDays: number;
  email: string;
  phone: string;
  links: string;
  interests: string;
  userEmail: string;
}

interface FormData {
  get(name: keyof FormDataOptions): string;
}

export async function createContact(formData: FormData) {
  const userEmail = formData.get("userEmail");

  const name = formData.get("name");
  const title = formData.get("title");
  const company = formData.get("company");
  const industry = formData.get("industry");
  const goalDays = Number(formData.get("goalDays"));
  const email = formData.get("email");
  const phone = formData.get("phone");
  const links = formData
    .get("links")
    .split(",")
    .filter((link) => link !== "");
  const interests = formData
    .get("interests")
    .split(",")
    .filter((link) => link !== "");

  const user = await db.getUserByEmail(userEmail);
  if (!user) throw new Error("User not found");

  if (email) validateEmail(email);
  if (phone) validatePhone(phone);

  const contactId = await db.createContact({
    name,
    title,
    company,
    industry,
    goalDays,
    email,
    phone,
    links,
    interests,
    userId: user.id,
  });

  redirect(`/contacts/${contactId}`);
}

export async function updateContact(formData: FormData) {
  const userEmail = formData.get("userEmail");

  const id = formData.get("id");
  const name = formData.get("name");
  const title = formData.get("title");
  const company = formData.get("company");
  const industry = formData.get("industry");
  const goalDays = Number(formData.get("goalDays"));
  const email = formData.get("email");
  const phone = formData.get("phone");
  const links = formData
    .get("links")
    .split(",")
    .filter((link) => link !== "");
  const interests = formData
    .get("interests")
    .split(",")
    .filter((link) => link !== "");

  const user = await db.getUserByEmail(userEmail);
  if (!user) throw new Error("User not found");

  if (email) validateEmail(email);
  if (phone) validatePhone(phone);

  const contactId = await db.updateContact({
    id,
    name,
    title,
    company,
    industry,
    goalDays,
    email,
    phone,
    links,
    interests,
    userId: user.id,
  });

  redirect(`/contacts/${contactId}`);
}
