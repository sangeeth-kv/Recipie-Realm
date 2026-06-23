import { Queue } from "bullmq";
import redis from "../config/redis";

export const nutritionQueue =
  new Queue(
    "nutrition-generation",
    {
      connection: redis
    }
  );