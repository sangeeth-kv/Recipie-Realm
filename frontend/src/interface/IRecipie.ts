export type CategoryType="Veg"|"Non-Veg"|"Dessert";
export type DifficultyType="Easy"|"Medium"|"Hard";
export interface IRecipe {
    _id:string;
    title:string;
    description:string;
    images:string[];
    category:CategoryType;
    tags:string[];
    ingredients:string[];
    steps:string[];
    prepTime:number;
    difficulty:DifficultyType;
    userId: {
        _id: string;
        fullname: string;
        profilePic: string,
    },
    likes:number;
    likedBy:string[];
    saves:number;
    savedBy:string[];
    views:number;
    averageRating:number;
    createdAt:Date;
    updatedAt:Date;
}