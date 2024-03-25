import { changeVerifyStatus, signinFn, signupFn } from "./controllers/auth";
import { fetchCategories } from "./controllers/category";
import {
  getUserCategories,
  updateUserSelectedCategories,
} from "./controllers/user";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";

export const appRouter = router({
  signup: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
        name: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { email, name, password } = input;
      return await signupFn({ email, password, name });
    }),
  verify: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input }) => {
      const { email } = input;
      return await changeVerifyStatus({ email });
    }),
  signin: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { email, password } = input;
      return await signinFn({ email, password });
    }),

  getUserCategories: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .query(async ({ input }) => {
      const { email } = input;
      return await getUserCategories({ email });
    }),

  updateUserCategories: publicProcedure
    .input(
      z.object({
        userId: z.number(),
        selectedCategoryIds: z.union([z.array(z.number()), z.number()]),
      }),
    )
    .mutation(async ({ input }) => {
      const { userId, selectedCategoryIds } = input;
      return await updateUserSelectedCategories({
        userId,
        selectedCategoryIds: Array.isArray(selectedCategoryIds)
          ? selectedCategoryIds
          : [selectedCategoryIds],
      });
    }),

  getCategories: publicProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
      }),
    )
    .query(async ({ input }) => {
      const PAGE_SIZE = 6;
      const take = PAGE_SIZE;
      const { page } = input;
      return await fetchCategories({ page, take });
    }),
});

export type AppRouter = typeof appRouter;
