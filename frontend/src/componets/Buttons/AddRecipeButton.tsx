import { Plus } from "lucide-react";

interface IAddRecipeButtonProps {
  onClick: () => void;
}

function AddRecipeButton({
  onClick,
}: IAddRecipeButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        fixed
        bottom-6
        right-6
        z-50

        flex
        items-center
        gap-2

        px-5
        py-3

        rounded-full

        bg-gradient-to-r
        from-orange-500
        to-red-500

        text-white
        font-semibold

        shadow-lg
        hover:shadow-2xl
        hover:scale-105

        transition-all
        duration-300
      "
    >
      <Plus className="w-5 h-5" />

      <span className="hidden sm:block">
        Add Recipe
      </span>
    </button>
  );
}

export default AddRecipeButton;