"use server";

import * as db from "@/lib/prisma";
import { formatPhoneNumber, validateEmail, validatePhone } from "@/lib/utils";
import { redirect } from "next/navigation";

interface FormDataOptions {
  name: string;
  email: string;
  phone: string;
  category: string;
  goalDays: number;
  note: string;
  userEmail: string;
  pathname: string;
}

interface FormData {
  get(name: keyof FormDataOptions): string;
}

export async function createContact(formData: FormData) {
  const userEmail = formData.get("userEmail");
  const pathname = formData.get("pathname");

  const phone = formData.get("phone");
  const email = formData.get("email");
  const name = formData.get("name");
  const category = formData.get("category");
  const goalDays = Number(formData.get("goalDays"));
  const note = formData.get("note");

  const user = await db.getUserByEmail(userEmail);
  if (!user) throw new Error("User not found");

  validateEmail(email);
  if (phone) validatePhone(phone);

  const formattedPhoneNumber = formatPhoneNumber(phone);

  await db.createContact({
    name,
    email,
    phone: formattedPhoneNumber,
    category,
    goalDays,
    note,
    userId: user.id,
  });

  redirect(pathname);
}
