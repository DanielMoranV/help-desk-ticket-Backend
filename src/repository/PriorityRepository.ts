import { Priority } from "@prisma/client";
import prisma from "../connection/prisma";

export function getPriority(): Promise<Priority[]> {
  return prisma.instance.priority.findMany({
    orderBy: {
      priorityId: "asc",
    },
  });
}

export function createPriority(data: Priority): Promise<Priority> {
  return prisma.instance.priority.create({ data });
}

export function updatePriority(
  priorityId: number,
  data: Priority
): Promise<Priority> {
  return prisma.instance.priority.update({
    where: { priorityId },
    data,
  });
}

export function deletePriority(priorityId: number): Promise<Priority> {
  return prisma.instance.priority.delete({
    where: {
      priorityId,
    },
  });
}
