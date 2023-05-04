import NextAuth, { AuthOptions } from "next-auth";
import LinkedInProvider from "next-auth/providers/linkedin";
import prisma from "@/lib/prisma";
import { JWT } from "next-auth/jwt/types";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    LinkedInProvider({
      clientId: String(process.env.LINKEDIN_CLIENT_ID),
      clientSecret: String(process.env.LINKEDIN_CLIENT_SECRET),
    }),
  ],
  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    async session({ session, token }) {
      await upsertUser(token);
      return session;
    },
  },
};

async function upsertUser(token: JWT) {
  const name = token.name ?? "";
  const email = token.email ?? "";
  const providerId = token.sub ?? "";
  const picture = token.picture ?? "";

  await prisma.users.upsert({
    where: {
      providerId,
    },
    update: {
      name,
      email,
      picture,
    },
    create: {
      name,
      email,
      providerId,
      picture,
    },
  });
}

export default NextAuth(authOptions);
