import { Ticket, TickePhoto } from "@prisma/client";
import prisma from "../connection/prisma";

export function getTickets(): Promise<Ticket[]> {
  return prisma.instance.ticket.findMany({
    orderBy: {
      ticketId: "asc",
    },
    include: {
      ticketPhoto: true,
    },
  });
}
export function getTicketUserId(userId: number): Promise<Ticket[]> {
  return prisma.instance.ticket.findMany({
    where: { userId },
    orderBy: {
      ticketId: "asc",
    },
    include: {
      ticketPhoto: true,
    },
  });
}
export function getTicketId(ticketId: number): Promise<Ticket[]> {
  return prisma.instance.ticket.findMany({
    where: { ticketId },
    orderBy: {
      ticketId: "asc",
    },
    include: {
      ticketPhoto: true,
    },
  });
}

export function createTicket(data: Ticket): Promise<Ticket> {
  return prisma.instance.ticket.create({ data });
}
export function createTicketPhoto(data: any) {
  return prisma.instance.tickePhoto.createMany({ data });
}

export function updateTicket(ticketId: number, data: any): Promise<Ticket> {
  return prisma.instance.ticket.update({
    where: { ticketId },
    data,
  });
}

export function deleteTicket(ticketId: number): Promise<Ticket> {
  return prisma.instance.ticket.delete({
    where: {
      ticketId,
    },
  });
}