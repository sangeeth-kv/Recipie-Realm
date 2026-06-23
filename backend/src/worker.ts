// worker.ts

import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { ENV } from "./config/env";



async function startWorker() {

    console.log("MONGO_URI:", process.env.MONGO_URI);
  await mongoose.connect(
    ENV.MONGO_URI
  );

  console.log("Mongo Connected");

  await import("./workers/nutrition.worker");

  console.log(
    "Nutrition Worker Started"
  );
}

startWorker().catch(console.error);