import type { Request, Response } from "express";
import { consultaDNI, consultaCMP } from "../repository/UtilidadesRepository";
import { success, failure } from "../utils/response";

// Datos de Categorias
// --------------------------------

class UtilidadesHandler {
  // Lista de empleados
  public async consultaDNI(req: Request, res: Response): Promise<void> {
    try {
      const dni = req.params.dni;
      const user = await consultaDNI(dni);
      if (user.dni == "") {
        failure({ res, message: "DNI no encontrado" });
        return;
      }
      const message = "Operación exitosa Registro Encontrado";
      success({ res, data: user, message });
    } catch (error: any) {
      console.log(error);
      const message = error;
      failure({ res, message });
    }
  }
  public async consultaCMP(req: Request, res: Response): Promise<void> {
    try {
      const cmp = req.params.cmp;
      const user = await consultaCMP(cmp);
      if (user.cmp == "") {
        failure({ res, message: "CMP no encontrado" });
        return;
      }
      const message = "Operación exitosa Registro Encontrado";
      success({ res, data: user, message });
    } catch (error: any) {
      console.log(error);
      const message = error;
      failure({ res, message });
    }
  }
}
export default UtilidadesHandler;
