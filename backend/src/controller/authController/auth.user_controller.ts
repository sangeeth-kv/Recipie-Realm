import { NextFunction, Request,Response, } from "express"
import { Signup } from "../../types/Signup"
import { apiResponse } from "../../helpers/apiResponse"
import logger from "../../config/logger"
import { SignupRequestDTO, SignupResponseDTO } from "../../dtos/signup.dto"
import { IAuthUserController } from "../../interface/user/IAuthUserController"
import { IAuthUserService } from "../../interface/user/IAuthUserService"
import { SigninRequestDTO, SigninResponseDTO } from "../../dtos/signin.dto"
import { ENV } from "../../config/env"
import { TokenUserPayload } from "../../types/TokenUserPayload"
import { AppError } from "../../utils/AppError"
import { GetMeResponseDTO } from "../../dtos/getMeResponse.dto"

export class AuthUserController implements IAuthUserController{
    constructor(private authService:IAuthUserService){}

    signup=async (req:Request,res:Response,next:NextFunction):Promise<void>=>{
        try {
            logger.debug("Hitted AuthController in Signup fn")

            const signupData:SignupRequestDTO=req.body

            const result=await this.authService.signup(signupData)

            console.log("Result : ",result)

            apiResponse<SignupResponseDTO>(res,201,true,"Account created successfully",result)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    signin=async(req: Request, res: Response, next: NextFunction):Promise<void>=>{
        try {
            const data:SigninRequestDTO=req.body

            logger.debug("Hitted on authController")

            const result=await this.authService.signin(data)

            console.log("result : ",result)

            res.cookie("accessToken",result.accessToken,{
                httpOnly:true,
                secure:ENV.NODE_ENV==="production",
                sameSite:"lax",
                maxAge: 15 * 60 * 1000, // 15 min
            })

            res.cookie("refreshToken",result.refreshToken,{
                httpOnly:true,
                secure:ENV.NODE_ENV==="production",
                sameSite:"lax",
                maxAge:7 * 24 * 60 * 60 * 1000 // 7 days
            })

            apiResponse<SigninResponseDTO>(res,200,true,"Login successfully",result)

        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    getMe=async(req: Request, res: Response, next: NextFunction):Promise<void>=>{
        try {

            console.log("Reacges")

            const userId=req.user?.userId;

            if(!userId){
                throw new AppError("UNAUTHORIZED",401)
            }

            const user=await this.authService.getMe(userId)

            apiResponse<GetMeResponseDTO>(res,200,true,"USER_FETCHED",user)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    refresh= async(req: Request, res: Response, next: NextFunction):Promise<void> => {
        try {
            const refreshToken=req.cookies.refreshToken

            if(!refreshToken){
                throw new AppError("NOT_AUTHENTICATED",401)
            }

            const result=await this.authService.refresh(refreshToken)

            res.cookie("accessToken",result.newAccessToken,{
                httpOnly:true,
                secure:ENV.NODE_ENV==="production",
                sameSite:"lax",
                maxAge: 15 * 60 * 1000,
            })

            res.cookie("refreshToken",result.newRefreshToken,{
                httpOnly:true,
                secure:ENV.NODE_ENV==="production",
                sameSite:"lax",
                maxAge:7 * 24 * 60 * 60 * 1000 // 7 days
            })

            apiResponse(res, 200, true, "TOKEN_REFRESHED");
            
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    
}