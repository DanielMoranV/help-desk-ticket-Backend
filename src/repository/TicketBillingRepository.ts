import { TicketBilling, TickePhoto } from "@prisma/client";
import prisma from "../connection/prisma";
export function getTickets(): Promise<TicketBilling[]> {
  return prisma.instance.ticketBilling.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      TickePhotoBilling: true,
      categoryBilling: true,
      priority: true,
      user: true,
    },
  });
}
export function getTicketUserId(userId: number): Promise<TicketBilling[]> {
  return prisma.instance.ticketBilling.findMany({
    where: { userId },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      TickePhotoBilling: true,
      categoryBilling: true,
      priority: true,
    },
  });
}
export function getTicketId(ticketBillingId: number): Promise<TicketBilling[]> {
  return prisma.instance.ticketBilling.findMany({
    where: { ticketBillingId },
    orderBy: {
      ticketBillingId: "asc",
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
      categoryBilling: true,
      priority: true,
      TickePhotoBilling: true,
    },
  });
}

export function createTicket(data: TicketBilling): Promise<TicketBilling> {
  return prisma.instance.ticketBilling.create({ data });
}
export function createTicketPhoto(data: any) {
  return prisma.instance.tickePhoto.createMany({ data });
}

export function updateTicket(
  ticketBillingId: number,
  data: any
): Promise<TicketBilling> {
  return prisma.instance.ticketBilling.update({
    where: { ticketBillingId },
    data,
  });
}

export function deleteTicket(ticketBillingId: number): Promise<TicketBilling> {
  return prisma.instance.ticketBilling.delete({
    where: {
      ticketBillingId,
    },
  });
}
