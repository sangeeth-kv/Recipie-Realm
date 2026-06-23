export interface INutritionQueueService {
    addJob(recipeId:string):Promise<void>;
}