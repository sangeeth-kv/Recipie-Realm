import { Request, Response, NextFunction } from "express";
import { IProfileUserController } from "../../interface/user/profilesInterface/IProfileUserController";
import logger from "../../config/logger";
import { IProfileUserService } from "../../interface/user/profilesInterface/IProfileUserService";
import { apiResponse } from "../../helpers/apiResponse";
import { GetProfileResponseDTO, GetProfilesResponseDTO } from "../../dtos/profileDTOs/getProfileResponse.dto";
import { TokenUserPayload } from "../../types/TokenUserPayload";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequestType";








export class ProfileUserController implements IProfileUserController{
    constructor(private profileService:IProfileUserService){}

    getProfiles=async (req: AuthenticatedRequest, res: Response, next: NextFunction):Promise<void>=>{
        try {
            logger.debug("Hitted ProfileController in getAllProfiles")
            console.log("req : ",req.user)

            const userId=req.user.userId 

            const {page,limit,search}=req.query

            const result=await this.profileService.getProfiles(userId,Number(page),Number(limit),search as string)

            console.log("Result : ",result)
            

            apiResponse<GetProfilesResponseDTO>(res,200,true,"USERS_FETCHED",result)

        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    getProfileById=async (req: Request, res: Response, next: NextFunction):Promise<void> => {
        try {
            
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    updateProfile=async (req: Request, res: Response, next: NextFunction):Promise<void> => {
        try {
            
        } catch (error) {
            console.log(error)
            next(error)
        }   
    }

}