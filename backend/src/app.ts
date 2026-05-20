import express from "express";
import cors from "cors";
import auth_user_Routes from "./routes/userRoutes/auth.user_routes";
import profile_user_Routes from "./routes/userRoutes/profiles.user_routes";
import recipe_Routes from "./routes/userRoutes/recipe.user_routes";
import { globalErrorHandler } from "./middlewares/errorHandlerMiddleware";
import cookieparser from "cookie-parser";
import requestLogger from "./logger/requestLogger";
import { ENV } from "./config/env";

console.log(ENV.FRONTEND_URL)

const app = express();

app.use(cors(
    {
    origin:[ENV.FRONTEND_URL,ENV.ADMIN_FRONTEND_URL],
    credentials:true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
    }
));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cookieparser())

app.use(requestLogger)
app.use("/",profile_user_Routes)
app.use("/auth",auth_user_Routes)
app.use("/recipe",recipe_Routes)

// app.use("/admin/auth",admin_auth_routes)

app.use(globalErrorHandler)

export default app;