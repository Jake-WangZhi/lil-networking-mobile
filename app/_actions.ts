"use server";

import * as prisma from "@/lib/prisma";
import { formatPhoneNumber, validateEmail, validatePhone } from "@/lib/utils";
import { redirect } from "next/navigation";

interface FormDataOptions {
  name: string;
  email: string;
  phone: string;
  userEmail: string;
}

interface FormData {
  get(name: keyof FormDataOptions): string;
}

export async function createContact(formData: FormData) {
  const userEmail = formData.get("userEmail");
  const phone = formData.get("phone");
  const email = formData.get("email");
  const name = formData.get("name");

  const user = await prisma.getUserByEmail(userEmail);
  if (!user) throw new Error("User not found");

  validateEmail(email);
  if (phone) validatePhone(phone);

  const formattedPhoneNumber = formatPhoneNumber(phone);

  await prisma.createContact({
    name,
    email,
    phone: formattedPhoneNumber,
    usersId: user.id,
  });

  redirect("/dashboard");
}
