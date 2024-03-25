import { prisma } from "~/utils/prisma-client";

// functions related to category fetching
const PAGE_SIZE = 6;

type Category = {
  id: number;
  name: string;
};

type FetchCategoriesParams = {
  page: number;
  take: number;
};

// Fetch 6 categories according to pagenumber
export async function fetchCategories({
  page,
  take = PAGE_SIZE,
}: FetchCategoriesParams): Promise<Category[]> {
  const skip = (page - 1) * take;
  const categories = await prisma.category.findMany({ skip, take });
  return categories;
}
