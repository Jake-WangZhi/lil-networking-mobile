import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const goalsCollection = await prisma.goals.findMany();

    await prisma.$transaction(
      goalsCollection.map((goals) => {
        const { connections, goalConnections, messages, goalMessages, streak } =
          goals;

        return prisma.goals.update({
          where: {
            id: goals.id,
          },
          data: {
            streak: {
              increment:
                connections >= goalConnections && messages >= goalMessages
                  ? 1
                  : -streak,
            },
            connections: 0,
            messages: 0,
          },
        });
      })
    );

    response.status(200).json({ message: "Streaks updated successfully" });
  } catch (error) {
    response.status(500).json({ error: "Error updating streaks" });
  }
}
