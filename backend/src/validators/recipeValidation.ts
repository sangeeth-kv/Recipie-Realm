import { z } from "zod";


const parseJson = (value: unknown) => {
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }

  return value;
};

const ingredientSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Ingredient name is required")
    .max(100, "Ingredient name is too long"),

  quantity: z
    .coerce
    .number()
    .positive("Quantity must be greater than 0"),

  unit: z
    .string()
    .trim()
    .min(1, "Unit is required")
    .max(50, "Unit is too long"),
});

export const createRecipeSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must contain at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),

  description: z
    .string()
    .trim()
    .min(10, "Description must contain at least 10 characters")
    .max(1000, "Description cannot exceed 1000 characters"),

  images: z
    .array(
      z.string().url("Invalid image URL")
    )
    .max(10, "Maximum 10 images allowed")
    .optional(),

  category: z.enum([
    "Veg",
    "Non-Veg",
    "Dessert",
  ]),

  tags: z.preprocess(
  parseJson,
  z.array(
    z.string().trim().min(1)
  )
),

ingredients: z.preprocess(
  parseJson,
  z.array(ingredientSchema)
),

steps: z.preprocess(
  parseJson,
  z.array(
    z.string()
      .trim()
      .min(1)
  )
),

  prepTime: z.coerce
    .number()
    .min(1, "Preparation time must be at least 1 minute")
    .max(1440, "Preparation time cannot exceed 24 hours"),

  difficulty: z.enum([
    "Easy",
    "Medium",
    "Hard",
  ]),
});