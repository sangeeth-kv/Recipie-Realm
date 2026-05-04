import { Sun, Moon } from "lucide-react";
import { toggleMode } from "../../store/themeSlice";
import { useAppDispatch, useAppSelector } from "../../types/ThemeHookType";

function ToggleButton() {
  const mode = useAppSelector((state) => state.theme.mode);
  const dispatch = useAppDispatch();

  return (
    <button
      onClick={() => dispatch(toggleMode())}
      className="
        relative flex items-center justify-center
        w-11 h-11 rounded-full
        bg-white/10 dark:bg-gray-700
        border border-white/20 dark:border-gray-600
        text-white dark:text-yellow-300
        backdrop-blur-md
        shadow-md
        transition-all duration-300
        hover:scale-105
        hover:bg-white/20
        dark:hover:bg-gray-600
        active:scale-95
      "
    >
      <span className="transition-transform duration-300">
        {mode === "dark" ? (
          <Sun className="w-5 h-5 rotate-0 transition-all duration-300" />
        ) : (
          <Moon className="w-5 h-5 transition-all duration-300" />
        )}
      </span>
    </button>
  );
}

export default ToggleButton;