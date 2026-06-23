// validations/aiEnhanceSchema.ts

import { z } from "zod";

export const enhanceDescriptionSchema = z.object({
    description: z
        .string()
        .trim()
        .min(10, "Description is too short.")
        .max(1000, "Description is too long."),

    isReGenerate: z.boolean()
});