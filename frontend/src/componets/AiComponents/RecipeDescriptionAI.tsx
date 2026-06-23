// components/RecipeDescriptionAI.tsx

import { Sparkles, Loader2 } from "lucide-react";

interface Props {
  original: string;
  enhanced: string;
  loading: boolean;
  showEnhanced: boolean;
  onEnhance: () => void;
  onAccept: () => void;
  onReject: () => void;
  onRegenerate: () => void;
}

export default function RecipeDescriptionAI({
  original,
  enhanced,
  loading,
  showEnhanced,
  onEnhance,
  onAccept,
  onReject,
  onRegenerate,
}: Props) {
  return (
    <div className="space-y-4">

      {original  &&  (
        <button
          type="button"
        //   onClick={onEnhance}
            onClick={() => onEnhance()}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600"
        >
          <Sparkles size={18} />
          Enhance with AI
        </button>
      )}

      {loading && (
        <div className="flex items-center gap-3 bg-orange-50 p-4 rounded-xl">
          <Loader2 className="animate-spin text-orange-500" />
          <span>AI is enhancing your description...</span>
        </div>
      )}

      {showEnhanced && (
        <div className="space-y-4">

          <div>
            <h3 className="font-semibold mb-2">
              AI Suggestion
            </h3>

            <div className="p-4 border rounded-xl bg-slate-50">
              {enhanced}
            </div>
          </div>

          <div className="flex gap-3">

            <button
              type="button"
              onClick={onAccept}
              className="px-4 py-2 bg-green-500 text-white rounded-xl"
            >
              Use This
            </button>

            <button
              type="button"
              onClick={onRegenerate}
              className="px-4 py-2 border rounded-xl"
            >
              Regenerate
            </button>

            <button
              type="button"
              onClick={onReject}
              className="px-4 py-2 border rounded-xl"
            >
              Keep Original
            </button>

          </div>
        </div>
      )}
    </div>
  );
}