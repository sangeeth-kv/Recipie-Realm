// src/pages/AddRecipe/AddRecipePage.tsx

import { useState } from "react";
import RecipeBasicInfo from "../../componets/Recipies/AddRecipies/RecipeBasicInfo";
import RecipeImageUpload, { type ImageEntry } from "../../componets/Recipies/AddRecipies/RecipeImageUpload";
import RecipeTags from "../../componets/Recipies/AddRecipies/RecipeTags";
import RecipeIngredients from "../../componets/Recipies/AddRecipies/RecipeIngredients";
import RecipeSteps from "../../componets/Recipies/AddRecipies/RecipeSteps";
import RecipeSubmitBar from "../../componets/Recipies/AddRecipies/RecipeAddButton";
import addRecipe from "../../services/addRecipe";
import { recipeSchema, formatZodErrors } from "../../validation/recipeSchema";
import { useUploadStore } from "../../app/uploadStore";
import { useNavigate } from "react-router-dom";
// import { ZodError } from "zod";

// ─── Form data type ───────────────────────────────────────────────────────────

export interface RecipeFormData {
  title: string;
  description: string;
  images: ImageEntry[];
  category: string;
  tags: string[];
  ingredients: string[];
  steps: string[];
  prepTime: number;
  difficulty: string;
}

// Field error map — one message per top-level field
type FieldErrors = Partial<Record<keyof RecipeFormData | "_form", string>>;

// ─── Small reusable error message component ───────────────────────────────────

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
      <span className="inline-block w-1 h-1 rounded-full bg-red-500 shrink-0" />
      {message}
    </p>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AddRecipePage() {
  const [formData, setFormData] = useState<RecipeFormData>({
    title: "",
    description: "",
    images: [],
    category: "Veg",
    tags: [],
    ingredients: [""],
    steps: [""],
    prepTime: 0,
    difficulty: "Easy",
  });

  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const {startUpload,setProgress,finishUpload,failUpload}=useUploadStore();
  const navigate = useNavigate();

  // ── Update helper ───────────────────────────────────────────────────────────
  const updateField = <K extends keyof RecipeFormData>(
    field: K,
    value: RecipeFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear the error for this field as soon as the user makes a change
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setFieldErrors({});

    // ── 1. Validate with Zod ────────────────────────────────────────────────
    const result = recipeSchema.safeParse(formData);

    if (!result.success) {
      const errors = formatZodErrors(result.error);
      setFieldErrors(errors);

      // Scroll to the first error field
      const firstErrorKey = Object.keys(errors)[0];
      if (firstErrorKey) {
        document
          .getElementById(`field-${firstErrorKey}`)
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    // ── 2. Build FormData and call API ──────────────────────────────────────
    setSubmitting(true);
    try {
      const fd = new FormData();

      fd.append("title", result.data.title);
      fd.append("description", result.data.description);
      fd.append("category", result.data.category);
      fd.append("prepTime", String(result.data.prepTime));
      fd.append("difficulty", result.data.difficulty);

      result.data.tags.forEach((tag, i) => fd.append(`tags[${i}]`, tag));
      result.data.ingredients.forEach((ing, i) => fd.append(`ingredients[${i}]`, ing));
      result.data.steps.forEach((step, i) => fd.append(`steps[${i}]`, step));

      // Use the validated ImageEntry array (from result.data)
      formData.images.forEach((entry, i) => {
        // fd.append(`images[${i}]`, entry.croppedBlob, `recipe-image-${i}.jpg`);
        fd.append(
  "images",
  entry.croppedBlob,
  `recipe-image-${i}.jpg`
);
      });

      startUpload();



      const promiseResponse =addRecipe(fd,(progress)=>{
        setProgress(progress)
      });

      navigate(-1)

      const data = await promiseResponse

      setTimeout(() => {
        finishUpload();
      }, 1000)

      console.log("Recipe created:", data);
      setSubmitted(true);
      // TODO: redirect / show success toast

    } catch (err) {
      failUpload();
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success state ───────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-sm p-10 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Recipe Added!</h2>
          <p className="text-slate-500">Your recipe has been shared with the community.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-6 md:p-8">

        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Add New Recipe</h1>
          <p className="text-slate-500 mt-2">Share your amazing recipe with the community.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-8">

          {/* Basic Info */}
          <section id="field-title">
            <RecipeBasicInfo formData={formData} updateField={updateField} />
            <FieldError message={fieldErrors.title} />
            <FieldError message={fieldErrors.description} />
            <FieldError message={fieldErrors.category} />
            <FieldError message={fieldErrors.prepTime} />
            <FieldError message={fieldErrors.difficulty} />
          </section>

          {/* Images */}
          <section id="field-images">
            <RecipeImageUpload
              images={formData.images}
              updateField={
                updateField as <K extends keyof RecipeFormData>(
                  field: K,
                  value: RecipeFormData[K]
                ) => void
              }
            />
            <FieldError message={fieldErrors.images} />
          </section>

          {/* Tags */}
          <section id="field-tags">
            <RecipeTags tags={formData.tags} updateField={updateField} />
            <FieldError message={fieldErrors.tags} />
          </section>

          {/* Ingredients */}
          <section id="field-ingredients">
            <RecipeIngredients ingredients={formData.ingredients} updateField={updateField} />
            <FieldError message={fieldErrors.ingredients} />
          </section>

          {/* Steps */}
          <section id="field-steps">
            <RecipeSteps steps={formData.steps} updateField={updateField} />
            <FieldError message={fieldErrors.steps} />
          </section>

          {/* Global API error */}
          {submitError && (
            <div className="flex items-start gap-3 text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-xl">
              <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {submitError}
            </div>
          )}

          {/* Validation summary — shown only after a failed submit attempt */}
          {Object.keys(fieldErrors).length > 0 && (
            <div className="bg-orange-50 border border-orange-100 rounded-xl px-4 py-3">
              <p className="text-sm font-semibold text-orange-700 mb-2">
                Please fix the following before submitting:
              </p>
              <ul className="space-y-1">
                {Object.entries(fieldErrors).map(([field, msg]) =>
                  msg ? (
                    <li key={field} className="text-xs text-orange-600 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-orange-400 shrink-0" />
                      <button
                        type="button"
                        className="underline underline-offset-2 hover:text-orange-800 text-left"
                        onClick={() =>
                          document
                            .getElementById(`field-${field}`)
                            ?.scrollIntoView({ behavior: "smooth", block: "center" })
                        }
                      >
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </button>
                      : {msg}
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          )}

          <RecipeSubmitBar submitting={submitting} />
        </form>
      </div>
    </div>
  );
}