import type { Request, Response } from "express";
import { getErrorMessageByCode } from "../midlewares/errormessagebycode";
import {
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryBilling,
} from "../repository/CategoryRepository";
import { success, failure } from "../utils/response";

// Datos de Categorias
// --------------------------------

class CategoryHandler {
  // Lista de empleados
  public async getCategoryBilling(_req: Request, res: Response): Promise<void> {
    try {
      const users = await getCategoryBilling();
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
  public async getCategory(_req: Request, res: Response): Promise<void> {
    try {
      const users = await getCategory();
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
  public async createCategory(req: Request, res: Response): Promise<void> {
    const data = req.body;
    try {
      const newCategory = await createCategory(data);
      const message = "Operación exitosa Registro Creado";
      success({ res, data: newCategory, message });
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }

  // Actualizar datos de Categoria (categoryId)
  public async updateCategory(req: Request, res: Response): Promise<void> {
    try {
      const categoryId = Number(req.params.categoryId);
      const data = req.body;
      const category = await updateCategory(categoryId, data);
      const message = "Operación exitosa Registro Actualizado";
      success({ res, data: category, message });
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }

  // Eliminar datos de Categoria (categoryId)
  public async deleteCategory(req: Request, res: Response): Promise<void> {
    try {
      const categoryId = Number(req.params.categoryId);
      const category = await deleteCategory(categoryId);
      const message = "Operación exitosa Registro Eliminado";
      success({ res, data: category, message });
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      failure({ res, message });
    }
  }
}

export default CategoryHandler;
