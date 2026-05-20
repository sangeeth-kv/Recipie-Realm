import React from "react";
import { motion } from "framer-motion";
import { ChefHat } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description = "Nothing to show here right now.",
}) => {
  return (
    <div className="w-full flex items-center justify-center py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center text-center"
      >
        {/* Animated Circle Glow */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-28 h-28 bg-orange-100 rounded-full blur-2xl"
        />

        {/* Icon */}
        <motion.div
          animate={{
            y: [0, -6, 0],
            rotate: [0, -4, 4, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative"
        >
          <ChefHat className="w-14 h-14 text-orange-500" />
        </motion.div>

        {/* Title */}
        <h2 className="mt-5 text-xl font-semibold text-gray-800">
          {title}
        </h2>

        {/* Description */}
        <p className="mt-2 text-sm text-gray-500 max-w-sm">
          {description}
        </p>
      </motion.div>
    </div>
  );
};

export default EmptyState;