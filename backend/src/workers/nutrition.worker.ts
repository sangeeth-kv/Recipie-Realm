import { Worker } from "bullmq";
import redis from "../config/redis";

import {
    nutritionService
} from "../container/nutrition.worker.container";
import logger from "../config/logger";

new Worker(
    "nutrition-generation", //when any queue is setted with this name it will start

    

    async(job)=>{ //here is the job we gave

        try {
            console.log("Job received:", job.data);
            const recipeId =job.data.recipeId; //here we got the recipeId we have passed when adding queue

            logger.debug("Before calling nutrition service");

            await nutritionService.generateNutrition(recipeId); //calling the function inside the nutritionService 

            console.log("Nutrition generated successfully");
        } catch (error) {
            console.error("WORKER ERROR:",error);
            throw error;
        }

        },  
    {
        connection:redis
    }
);