import type { Request, Response } from "express";
import { getErrorMessageByCode } from "../midlewares/errormessagebycode";
import { updateTicket } from "../repository/TicketRepository";
import { success, failure } from "../utils/response";

// Datos de Categorias
// --------------------------------

class PhotoTicketsHandler {
  // Lista de empleados
  //   public async getPhotoTickets(_req: Request, res: Response): Promise<void> {
  //     try {
  //       const users = await getPhotoTickets();
  //       if (users.length != 0) {
  //         const message = "Operación exitosa Lista de empleados";
  //         success({ res, data: users, message });
  //       } else {
  //         const message = "Operación exitosa sin registros";
  //         success({ res, data: users, message });
  //       }
  //     } catch (error: any) {
  //       const message = getErrorMessageByCode(error.code);
  //       failure({ res, message });
  //     }
  //   }

  // Actualizar datos de Categoria (photoTicketsId)
  public async updatePhotoTickets(req: Request, res: Response): Promise<void> {
    try {
      const photoTicketsId = Number(req.params.photoTicketsId);
      const data = req.body;
      const photoTickets = await updateTicket(photoTicketsId, data);
      const message = "Operación exitosa Registro Actualizado";
      success({ res, data: photoTickets, message });
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
}

export default PhotoTicketsHandler;
