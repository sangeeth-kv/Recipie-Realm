import logger from "../../config/logger";
import { INutritionQueueService } from "../../interface/queue/INutritionQueueService";
import { nutritionQueue } from "../../queues/nutrition.queue";

export default class NutritionQueueService implements INutritionQueueService {

    async addJob(
        recipeId:string
    ):Promise<void>{

         logger.debug("Nutrition Queue service inside ");
        await nutritionQueue.add( //added to the queue using the name 'generate-nutrition' of queue with data recipeId
                                    //worker listen for this
            "generate-nutrition",
            {
                recipeId
            }
        );
         logger.debug("After adding to QUEUe");
    }
}