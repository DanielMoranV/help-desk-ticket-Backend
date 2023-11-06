import { TicketBilling } from "@prisma/client";
import prisma from "../connection/prisma";
export function getTickets(): Promise<TicketBilling[]> {
  return prisma.instance.ticketBilling.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      TicketPhotoBilling: true,
      categoryBilling: true,
      priority: true,
      user: true,
      agent: {
        select: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
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
      TicketPhotoBilling: true,
      categoryBilling: true,
      priority: true,
      agent: {
        select: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
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
      TicketPhotoBilling: true,
      agent: {
        select: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
}

export function createTicket(data: TicketBilling): Promise<TicketBilling> {
  return prisma.instance.ticketBilling.create({ data });
}
export function createTicketPhoto(data: any) {
  return prisma.instance.ticketPhotoBilling.createMany({ data });
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
export async function countTicketsByStatus(): Promise<{
  [key: string]: number;
}> {
  const estados = ["Pendiente", "Espera", "Aprobado"];

  const counts = await prisma.instance.ticketBilling.groupBy({
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

  // Inicializar countsObject con 0 para cada estado
  estados.forEach((estado) => {
    countsObject[estado] = 0;
  });

  // Procesar resultados de la consulta
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
