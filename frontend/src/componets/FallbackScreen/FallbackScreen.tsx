// import React from "react";

// const FallbackScreen: React.FC = () => {
//   return (
//     <div
//       style={{
//         height: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         flexDirection: "column",
//         background: "#f8fafc",
//       }}
//     >
//       <div
//         style={{
//           width: 50,
//           height: 50,
//           border: "5px solid #e2e8f0",
//           borderTop: "5px solid #e05210",
//           borderRadius: "50%",
//           animation: "spin 1s linear infinite",
//         }}
//       />
//       <p
//         style={{
//           marginTop: 16,
//           fontSize: 14,
//           color: "#64748b",
//           fontWeight: 500,
//         }}
//       >
//         Loading...
//       </p>

//       <style>
//         {`
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//         `}
//       </style>
//     </div>
//   );
// };

// export default FallbackScreen;
import React from "react";
import { motion } from "framer-motion";
import { ChefHat } from "lucide-react";

const RecipeLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="relative flex flex-col items-center">
        
        {/* Animated Glow */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-24 h-24 rounded-full bg-orange-200 blur-2xl"
        />

        {/* Chef Hat */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, -6, 6, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative"
        >
          <ChefHat className="w-16 h-16 text-orange-500 drop-shadow-lg" />
        </motion.div>

        {/* Loading Dots */}
        <div className="flex gap-2 mt-5">
          {[0, 1, 2].map((dot) => (
            <motion.div
              key={dot}
              animate={{
                y: [0, -6, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: dot * 0.2,
              }}
              className="w-2 h-2 rounded-full bg-orange-400"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeLoader;