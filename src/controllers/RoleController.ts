import type { Request, Response } from "express";
import { getErrorMessageByCode } from "../midlewares/errormessagebycode";
import { getRole } from "../repository/RoleRepository";
import { success, failure } from "../utils/response";

// Datos de Categorias
// --------------------------------

class RoleHandler {
  // Lista de empleados
  public async getRole(_req: Request, res: Response): Promise<void> {
    try {
      const users = await getRole();
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
}

export default RoleHandler;
