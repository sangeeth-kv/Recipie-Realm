import { z } from "zod";
 
// ─── Image entry schema ───────────────────────────────────────────────────────
// We validate the shape of each ImageEntry object at runtime.
// File and Blob are browser globals — use z.instanceof() for them.
 
const ImageEntrySchema = z.object({
  file: z.instanceof(File, { message: "Invalid file" }),
  originalUrl: z.string().min(1),
  previewUrl: z.string().min(1),
  croppedBlob: z.instanceof(Blob, { message: "Invalid image blob" }),
  crop: z.object({ x: z.number(), y: z.number() }),
  zoom: z.number(),
  rotation: z.number(),
  croppedAreaPixels: z.any().nullable(),
});
 

const IngredientSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Ingredient name is required"),

  quantity: z
    .number()
    .positive("Quantity must be greater than 0"),

  unit: z
    .string()
    .trim()
    .min(1, "Unit is required"),
});
// ─── Main recipe schema ───────────────────────────────────────────────────────
 
export const recipeSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be under 100 characters"),
 
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be under 1000 characters"),
 
  images: z
    .array(ImageEntrySchema)
    .min(1, "Please add at least one image")
    .max(10, "You can upload up to 10 images"),
 
  category: z.enum(["Veg", "Non-Veg", "Vegan"], {
    errorMap: () => ({ message: "Please select a valid category" }),
  }),
 
  tags: z
    .array(z.string().min(1))
    .min(1, "Add at least one tag")
    .max(10, "Maximum 10 tags allowed"),
 
  ingredients: z
  .array(IngredientSchema)
  .min(1, "Add at least one ingredient")
  .max(50, "Maximum 50 ingredients allowed"),
 
  steps: z
    .array(z.string().min(1, "Step cannot be empty"))
    .min(1, "Add at least one step")
    .max(30, "Maximum 30 steps allowed")
    .transform((items) => items.filter((s) => s.trim() !== ""))
    .pipe(
      z.array(z.string().min(1)).min(1, "Add at least one step")
    ),
 
  prepTime: z
    .number({ invalid_type_error: "Prep time must be a number" })
    .min(1, "Prep time must be at least 1 minute")
    .max(1440, "Prep time must be under 1440 minutes (24 hours)"),
 
  difficulty: z.enum(["Easy", "Medium", "Hard"], {
    errorMap: () => ({ message: "Please select a valid difficulty" }),
  }),
});
 
// ─── Inferred type (matches RecipeFormData) ───────────────────────────────────
 
export type RecipeSchemaType = z.infer<typeof recipeSchema>;
 
// ─── Helper: flatten Zod errors into a simple key→message map ────────────────
 
export function formatZodErrors(
  error: z.ZodError
): Partial<Record<string, string>> {
  const map: Partial<Record<string, string>> = {};
  for (const issue of error.issues) {
    // Use the first path segment as the field key (e.g. "title", "images")
    const key = issue.path[0]?.toString() ?? "_form";
    if (!map[key]) map[key] = issue.message;
  }
  return map;
}