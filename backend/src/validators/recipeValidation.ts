import { z } from "zod";

export const createRecipeSchema = z.object({
  title: z
    .string()
    .min(3)
    .max(100),

  description: z
    .string()
    .min(10)
    .max(1000),

  category: z.enum([
    "Veg",
    "Non-Veg",
    "Vegan",
  ]),

  tags: z.array(z.string())
    .min(1)
    .max(10),

  ingredients: z.array(z.string())
    .min(1)
    .max(50),

  steps: z.array(z.string())
    .min(1)
    .max(30),

  prepTime: z.coerce.number()
    .min(1)
    .max(1440),

  difficulty: z.enum([
    "Easy",
    "Medium",
    "Hard",
  ]),
});