import { Bell } from "lucide-react";

export default function NotificationIcon({
  count = 0,
  onClick = () => {},
}) {
  return (
    <button
      onClick={onClick}
      aria-label="Notifications"
      className="
        relative flex items-center justify-center
        w-11 h-11 rounded-full
        bg-white/10 dark:bg-gray-700
        border border-white/20 dark:border-gray-600
        text-white dark:text-gray-200
        backdrop-blur-md
        shadow-md
        transition-all duration-300
        hover:scale-105
        hover:bg-white/20
        dark:hover:bg-gray-600
        active:scale-95
        focus:outline-none
        focus:ring-2
        focus:ring-orange-300
        dark:focus:ring-indigo-500
      "
    >
      {/* Bell Icon */}
      <Bell className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />

      {/* Notification Badge */}
      {count > 0 && (
        <span
          className="
            absolute -top-1 -right-1
            min-w-[18px] h-[18px]
            px-1 text-[10px] font-bold
            flex items-center justify-center
            rounded-full
            bg-red-500 text-white
            shadow-sm
            border border-white dark:border-gray-800
          "
        >
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
}