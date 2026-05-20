import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;

  onPageChange: (
    page: number
  ) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {

  if (totalPages < 1) {
    return null;
  }

  return (
    <div className="flex justify-center items-center gap-3 mt-12">

      {/* Previous */}
      <button
        disabled={currentPage === 1}
        onClick={() =>
          onPageChange(currentPage - 1)
        }
        className="
          p-3
          rounded-xl
          bg-white
          dark:bg-gray-800
          border
          disabled:opacity-50
        "
      >
        <ChevronLeft size={20} />
      </button>

      {/* Pages */}
      {Array.from({
        length: totalPages,
      }).map((_, index) => {

        const page = index + 1;

        return (
          <button
            key={page}
            onClick={() =>
              onPageChange(page)
            }
            className={`
              w-10
              h-10
              rounded-xl
              font-semibold
              transition-all
              ${
                currentPage === page
                  ? "bg-orange-500 text-white"
                  : `
                    bg-white
                    dark:bg-gray-800
                    border
                  `
              }
            `}
          >
            {page}
          </button>
        );
      })}

      {/* Next */}
      <button
        disabled={
          currentPage === totalPages
        }
        onClick={() =>
          onPageChange(currentPage + 1)
        }
        className="
          p-3
          rounded-xl
          bg-white
          dark:bg-gray-800
          border
          disabled:opacity-50
        "
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}