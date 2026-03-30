import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { verifyToken } from "../utils/jwt";
import { ENV } from "../config/env";
import { TokenUserPayload } from "../types/TokenUserPayload";


export const authMiddleware=(req:Request,res:Response,next:NextFunction)=>{
    try {
        const accessToken=req.cookies.accessToken

        if(!accessToken){
            throw new AppError("NOT_AUTHENTICATED",401)
        }

        const decoded=verifyToken<TokenUserPayload>(accessToken,ENV.ACCESS_TOKEN_SECRET) 

        if(!decoded?.user_Id){
            throw new AppError("INVALID_TOKEN",401)
        }
        console.log(decoded)

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