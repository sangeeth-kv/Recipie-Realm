import { Filter } from "lucide-react";

interface IFilterToggleButtonProps {
  showMobileFilters: boolean;
  setShowMobileFilters: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FilterToggleButton({
  showMobileFilters,
  setShowMobileFilters,
}: IFilterToggleButtonProps) {
  return (
    <button
      onClick={() => setShowMobileFilters(!showMobileFilters)}
      className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
    >
      <Filter className="w-6 h-6 text-slate-700" />
    </button>
  );
}