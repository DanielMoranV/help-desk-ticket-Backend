import type { Request, Response } from "express";
import { getErrorMessageByCode } from "../midlewares/errormessagebycode";
import {
  getPriority,
  createPriority,
  updatePriority,
  deletePriority,
} from "../repository/PriorityRepository";
import { success, failure } from "../utils/response";

// Datos de Categorias
// --------------------------------

class PriorityHandler {
  // Lista de empleados
  public async getPriority(_req: Request, res: Response): Promise<void> {
    try {
      const users = await getPriority();
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

  // Crear nuevo Categoria
  public async createPriority(req: Request, res: Response): Promise<void> {
    const data = req.body;
    try {
      const newPriority = await createPriority(data);
      const message = "Operación exitosa Registro Creado";
      success({ res, data: newPriority, message });
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }

  // Actualizar datos de Categoria (priorityId)
  public async updatePriority(req: Request, res: Response): Promise<void> {
    try {
      const priorityId = Number(req.params.priorityId);
      const data = req.body;
      const priority = await updatePriority(priorityId, data);
      const message = "Operación exitosa Registro Actualizado";
      success({ res, data: priority, message });
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }

  // Eliminar datos de Categoria (priorityId)
  public async deletePriority(req: Request, res: Response): Promise<void> {
    try {
      const priorityId = Number(req.params.priorityId);
      const priority = await deletePriority(priorityId);
      const message = "Operación exitosa Registro Eliminado";
      success({ res, data: priority, message });
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
}

export default PriorityHandler;
