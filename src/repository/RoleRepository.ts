import { Position } from "@prisma/client";
import prisma from "../connection/prisma";

export function getRole(): Promise<Position[]> {
  return prisma.instance.position.findMany({
    orderBy: {
      positionId: "asc",
    },
    include: {
      Area: true,
    },
  });
}
