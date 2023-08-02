import { NextApiRequest, NextApiResponse } from "next";
import prisma from "~/lib/prisma";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.query.key !== process.env.CRON_KEY) {
    response.status(404).end();
    return;
  }

  try {
    const goalsCollection = await prisma.goals.findMany();

    await prisma.$transaction(
      goalsCollection.map((goals) => {
        const {
          connections,
          goalConnections,
          messages,
          goalMessages,
          streak,
          highestStreak,
        } = goals;

        const isGoalReached =
          connections >= goalConnections && messages >= goalMessages;

        return prisma.goals.update({
          where: {
            id: goals.id,
          },
          data: {
            streak: {
              increment: isGoalReached ? 1 : -streak,
            },
            highestStreak: {
              increment: streak === highestStreak && isGoalReached ? 1 : 0,
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
