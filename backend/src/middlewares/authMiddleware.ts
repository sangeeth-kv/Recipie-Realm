import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { verifyToken } from "../utils/jwt";
import { ENV } from "../config/env";
import { TokenUserPayload } from "../types/TokenUserPayload";
import { decode } from "node:punycode";
import { ITokenService } from "../interface/ITokenService";


export class AuthMiddleware{

    constructor(private tokenService:ITokenService){}

    authHandle=(req:Request,res:Response,next:NextFunction)=>{
        try {
            const accessToken=req.cookies.accessToken

            console.log("hitted on the authHandle")

            console.log("cookies: =>",req.cookies)

            // if(!accessToken){
            //     throw new AppError("NOT_AUTHENTICATED",401)
            // }
            if (!accessToken) {
                return next(new AppError("TOKEN_EXPIRED", 401));
            }

            console.log("After accessToken checks : ")

            const decoded=this.tokenService.verifyToken<TokenUserPayload>(accessToken,ENV.ACCESS_TOKEN_SECRET) 

            console.log("Decoded :=> ",decoded)

            if(!decoded?.userId){
                // throw new AppError("INVALID_TOKEN",401)
                 return next(new AppError("TOKEN_EXPIRED", 401));
            }


            console.log("after decoded.userId : => ",decoded)

            req.user=decoded  as TokenUserPayload;

            next()

        } catch (error:any) {
            console.log("errrrrr",error.name)
            if(error.name==="TokenExpiredError"){
                console.log("hiiii")
                return next(new AppError("TOKEN_EXPIRED", 401));
            }
            return next(new AppError("INVALID_TOKEN", 401));
        }
    }
}