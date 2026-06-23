// components/CheckBox/CheckBox.tsx

import React from "react";

function CheckBox() {
  return (
    <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:border-orange-300 transition-colors">
      <input
        type="checkbox"
        className="w-5 h-5 accent-orange-500 cursor-pointer"
      />

      <div className="flex flex-col">
        <span className="font-medium text-slate-700">
          Use AI to enhance description
        </span>
        <span className="text-sm text-slate-500">
          Improve your recipe description using AI.
        </span>
      </div>
    </label>
  );
}

export default CheckBox;