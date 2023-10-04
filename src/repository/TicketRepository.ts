import { Ticket, TicketPhoto } from "@prisma/client";
import prisma from "../connection/prisma";

export function getTickets(): Promise<Ticket[]> {
  return prisma.instance.ticket.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      ticketPhoto: true,
      category: true,
      priority: true,
      user: true,
    },
  });
}
export function getTicketUserId(userId: number): Promise<Ticket[]> {
  return prisma.instance.ticket.findMany({
    where: { userId },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      ticketPhoto: true,
      category: true,
      priority: true,
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
      user: {
        select: {
          name: true,
        },
      },
      category: true,
      priority: true,
      ticketPhoto: true,
    },
  });
}

export function createTicket(data: Ticket): Promise<Ticket> {
  return prisma.instance.ticket.create({ data });
}
export function createTicketPhoto(data: any) {
  return prisma.instance.ticketPhoto.createMany({ data });
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

export async function countTicketsByStatus(): Promise<{
  [key: string]: number;
}> {
  const estados = ["Pendiente", "Espera", "Resuelto"];

  const counts = await prisma.instance.ticket.groupBy({
    by: ["status"],
    _count: {
      _all: true,
    },
    where: {
      status: {
        in: estados,
      },
    },
  });

  // Crear un objeto con los resultados
  const countsObject: { [key: string]: number } = {};
  let total = 0;

  for (const count of counts) {
    const estado = count.status || "Desconocido"; // Si no hay estado, usar 'Desconocido'
    const recuento = count._count?._all || 0; // Modificar la referencia al recuento

    countsObject[estado] = recuento;
    total += recuento;
  }

  // Agregar el total al objeto
  countsObject["Total"] = total;

  return countsObject;
}
