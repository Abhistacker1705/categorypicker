import { prisma } from "~/utils/prisma-client";

export const getUserCategories = async ({ email }: { email: string }) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { selectedcategories: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user.selectedcategories;
  } catch {
    throw new Error(`Failed to get user's selected categories`);
  }
};

//update user categories
export const updateUserSelectedCategories = async ({
  userId,
  selectedCategoryIds,
}: {
  userId: number;
  selectedCategoryIds: number[];
}) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        selectedcategories: {
          connect: selectedCategoryIds.map((categoryId) => ({
            id: categoryId,
          })),
        },
      },
    });
  } catch (error) {
    console.error(`Failed to update user's selected categories`);
    throw new Error(`Failed to update user's selected categories`);
  }
};
