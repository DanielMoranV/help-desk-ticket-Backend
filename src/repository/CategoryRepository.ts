import { Category } from "@prisma/client";
import prisma from "../connection/prisma";

export function getCategory(): Promise<Category[]> {
  return prisma.instance.category.findMany({
    orderBy: {
      categoryId: "asc",
    },
  });
}

export function createCategory(data: Category): Promise<Category> {
  return prisma.instance.category.create({ data });
}

export function updateCategory(
  categoryId: number,
  data: Category
): Promise<Category> {
  return prisma.instance.category.update({
    where: { categoryId },
    data,
  });
}

export function deleteCategory(categoryId: number): Promise<Category> {
  return prisma.instance.category.delete({
    where: {
      categoryId,
    },
  });
}
