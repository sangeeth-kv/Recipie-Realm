import { Request, Response, NextFunction } from "express";
import { IProfileUserController } from "../../interface/user/profilesInterface/IProfileUserController";
import logger from "../../config/logger";
import { IProfileUserService } from "../../interface/user/profilesInterface/IProfileUserService";








export class ProfileUserController implements IProfileUserController{
    constructor(private profileService:IProfileUserService){}

    getProfiles=async (req: Request, res: Response, next: NextFunction):Promise<void>=>{
        try {
            logger.debug("Hitted ProfileController in getAllProfiles")
            const result=this.profileService.getProfiles()

        } catch (error) {
            
        }
    }

    getProfileById=async (req: Request, res: Response, next: NextFunction):Promise<void> => {
        try {
            
        } catch (error) {
            
        }
    }

    updateProfile=async (req: Request, res: Response, next: NextFunction):Promise<void> => {
        try {
            
        } catch (error) {
            
        }   
    }

}