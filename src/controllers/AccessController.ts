import type { Request, Response } from "express";
import { getErrorMessageByCode } from "../midlewares/errormessagebycode";
import { success, failure } from "../utils/response";
import {
  createAccessUser,
  accessBydni,
  updateLastSession,
  getAccess,
  updateAccess,
  updatePasswordByUsername,
  deleteSessions,
} from "../repository/AccessRepository";
import { userBydni } from "../repository/UserRepository";
import { hashPassword, comparePassword } from "../utils/strings";
import { createToken } from "../midlewares/createToken";
// Login de empleados
// --------------------------------

class AccesHandler {
  // Crear nuevo acceso de  empleado
  public async createAccessUser(req: Request, res: Response): Promise<void> {
    try {
      const username = req.params.username;
      let data = req.body;
      data.password = await hashPassword(req.body.password);
      data.createAt = new Date();
      const user = await userBydni(username);
      if (user) {
        data = {
          username,
          userId: user.userId,
          ...data,
        };
        let newAccessUser = await createAccessUser(data);
        const message = "Operación exitosa Registro Acceso Creado";
        success({ res, data: newAccessUser, message });
      } else {
        const message = "dni no existe";
        failure({ res, message });
      }
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
  // public async addUser(req: Request, res: Response): Promise<void> {
  //   try {
  //     let data = req.body;
  //     data.password = await hashPassword(req.body.password);
  //     data.createAt = new Date();
  //     let newAccessUser = await addUser(data);
  //     const message = "Operación exitosa Registro Acceso Creado";
  //     success({ res, data: newAccessUser, message });
  //   } catch (error: any) {
  //     console.log(error);
  //     const message = getErrorMessageByCode(error.code);
  //     failure({ res, message });
  //   }
  // }
  // Login de empleado
  public async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      const access = await accessBydni(username);

      if (!access) {
        failure({ res, message: "dni no encontrado" });
      } else {
        const comparePass = await comparePassword(password, access.password);

        if (comparePass) {
          await updateLastSession(access.username);
          const token = await createToken(username);
          success({ res, data: { ...access, token } });
        } else {
          failure({ res, message: "Clave incorrecta" });
        }
      }
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }

  public async logoutUser(req: Request, res: Response): Promise<void> {
    try {
      const { username } = req.body;
      const userLoggedOut = await deleteSessions(username);
      const message = "Sesión cerrada correctamente";
      success({ res, data: userLoggedOut, message });
    } catch (error: any) {
      console.log(error);
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }

  // Lista de datos de acceso empleados
  public async getAccess(req: Request, res: Response): Promise<void> {
    try {
      const access = await getAccess();
      if (access.length != 0) {
        const message = "Operación exitosa Lista de Accesos";
        success({ res, data: access, message });
      } else {
        const message = "Operación exitosa sin registros";
        success({ res, data: access, message });
      }
    } catch (error: any) {
      console.log(error);
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }

  // Lista de datos de acceso de empleados por dni
  public async getAccessUser(req: Request, res: Response): Promise<void> {
    try {
      const username = req.params.username;
      const access = await accessBydni(username);
      if (access) {
        const message = "Operación exitosa Registro Encontrado";
        success({ res, data: access, message });
      } else {
        const message = "Operación exitosa No se encontraron resultados";
        success({ res, data: null, message });
      }
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }

  // Actualizar datos de acceso de empleados
  public async updateAccess(req: Request, res: Response) {
    try {
      const username = req.params.username;
      let data = req.body;
      data.password = await hashPassword(req.body.password);
      const access = await updateAccess(username, data);
      const message = "Operación exitosa Registro Actualizado";
      success({ res, data: access, message });
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }

  // Actualizar contraseñas de una lista de usuarios
  public async updatePasswords(req: Request, res: Response) {
    try {
      const users = req.body; // Array de objetos de usuarios con { username, password }

      // Recorrer la lista de usuarios y actualizar las contraseñas
      const updatedUsers = [];
      for (const user of users) {
        const hashedPassword = await hashPassword(user.password);
        const updatedUser = await updatePasswordByUsername(
          user.username,
          hashedPassword
        );
        updatedUsers.push(updatedUser);
      }

      // Mensaje exitoso para la respuesta
      const message = "Operación exitosa: Contraseñas actualizadas";

      // Enviar una respuesta exitosa con los usuarios actualizados y el mensaje
      success({ res, data: updatedUsers, message });
    } catch (error: any) {
      // Si ocurre un error, obtener un mensaje de error basado en el código del error
      const message = getErrorMessageByCode(error.code);

      // Enviar una respuesta de error con el mensaje de error correspondiente
      failure({ res, message });
    }
  }
}

export default AccesHandler;
