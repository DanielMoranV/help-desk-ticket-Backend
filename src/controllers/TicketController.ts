import type { Request, Response } from "express";
import { getErrorMessageByCode } from "../midlewares/errormessagebycode";
import { uploadImage } from "../midlewares/multerupload";
import {
  getTickets,
  getTicketUserId,
  getTicketId,
  createTicket,
  updateTicket,
  deleteTicket,
  createTicketPhoto,
} from "../repository/TicketRepository";
import { success, failure } from "../utils/response";

// Datos de Categorias
// --------------------------------

class TicketHandler {
  // Lista de Tickets
  public async getTickets(_req: Request, res: Response): Promise<void> {
    try {
      const users = await getTickets();
      if (users.length != 0) {
        const message = "Operación exitosa Lista de empleados";
        success({ res, data: users, message });
      } else {
        const message = "Operación exitosa sin registros";
        success({ res, data: users, message });
      }
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
  public async getTicketUserId(req: Request, res: Response): Promise<void> {
    try {
      const userId = Number(req.params.userId);
      console.log(userId);
      const users = await getTicketUserId(userId);

      if (users.length != 0) {
        const message = "Operación exitosa Lista de empleados";
        success({ res, data: users, message });
      } else {
        const message = "Operación exitosa sin registros";
        success({ res, data: users, message });
      }
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
  public async getTicketId(req: Request, res: Response): Promise<void> {
    try {
      const ticketId = Number(req.params.ticketId);
      const ticket = await getTicketId(ticketId);
      if (ticket.length != 0) {
        const message = "Operación exitosa Lista de empleados";
        success({ res, data: ticket, message });
      } else {
        const message = "Operación exitosa sin registros";
        success({ res, data: ticket, message });
      }
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }

  // Crear nuevo Ticket
  public async createTicket(req: Request, res: Response): Promise<void> {
    const data = req.body;
    try {
      const newTicket = await createTicket(data);
      const message = "Operación exitosa Registro Creado";
      success({ res, data: newTicket, message });
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }

  // Actualizar datos de Ticket (ticketId)
  public async updateTicket(req: Request, res: Response): Promise<void> {
    try {
      const ticketId = Number(req.params.ticketId);
      const data = req.body;
      const ticket = await updateTicket(ticketId, data);
      const message = "Operación exitosa Registro Actualizado";
      success({ res, data: ticket, message });
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
  // Actualizar foto de tickets
  public async updatePhotoTicket(req: Request, res: Response): Promise<void> {
    try {
      const ticketId = Number(req.params.ticketId);
      // Esperar a que la imagen se cargue antes de continuar
      await new Promise<void>((resolve, reject) => {
        uploadImage(req, res, (err) => {
          if (err) {
            err.message = "Archivo no permitido";

            return reject(err);
          }
          resolve();
        });
      });

      // Verificación de Archivos Subidos
      if (!req.files) {
        res.status(400).json({ error: "No se subió ninguna imagen" });
      }

      if (req.files) {
        const uploadedFilesData = (req.files as Express.Multer.File[]).map(
          (file) => {
            return {
              ticketId: ticketId,
              filename: file.filename,
            };
          }
        );
        const ticketPhoto = await createTicketPhoto(uploadedFilesData);
        const message = "Operación exitosa Registro Actualizado";
        success({ res, data: ticketPhoto, message });
      }
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
  // Eliminar datos de Ticket (ticketId)
  public async deleteTicket(req: Request, res: Response): Promise<void> {
    try {
      const ticketId = Number(req.params.ticketId);
      const ticket = await deleteTicket(ticketId);
      const message = "Operación exitosa Registro Eliminado";
      success({ res, data: ticket, message });
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
}

export default TicketHandler;
