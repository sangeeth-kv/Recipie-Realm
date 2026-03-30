import { Signup } from "../types/Signup";
import UserRepository from "../repository/user_repository"
import { AppError } from "../utils/AppError";
import logger from "../config/logger";
import { comparePassword, hashPassword } from "../utils/hashPassword";
import { SignupRequestDTO, SignupResponseDTO } from "../dtos/signup.dto";
import { IUserRepository } from "../interface/IUserRepository";
import { IAuthService } from "../interface/IAuthService";
import { SigninRequestDTO, SigninResponseDTO } from "../dtos/signin.dto";
import { TokenUserPayload } from "../types/TokenUserPayload";
import { generateAccessToken, generateRefreshToken, verifyToken } from "../utils/jwt";
import { ITokenStore } from "../interface/IRedisHelper";
import { GetMeResponseDTO } from "../dtos/getMeResponse.dto";
import mongoose from "mongoose";
import { ENV } from "../config/env";
import { RefreshResponseDTO } from "../dtos/refreshResponse.dto";

export class AuthService implements IAuthService {
    constructor(private userRepository: IUserRepository,private tokenStore:ITokenStore){}

    //for signup user

    signup=async (data:SignupRequestDTO): Promise<SignupResponseDTO>=>{ //used signup data transfer object 

        const {email,fullname,password,phone}=data

        logger.debug("Hitted on AuthService in Signup")

        const user=await this.userRepository.findUserByEmail(email);

        if(user){
            throw new AppError("User already exists", 400);
        }

        logger.debug("After user already exists check in Signup Authservice")

        const hashedPassword= await hashPassword(password)

        logger.debug(`Hashed password is ${hashedPassword}`)

        const newUser=await this.userRepository.createUser({
            email,
            fullname,
            password:hashedPassword,
            phone
        })

        return {
            id: newUser._id.toString(),
            email: newUser.email,
            fullname: newUser.fullname,
            phone: newUser.phone,
            isBlocked: newUser.isBlocked,
            isVerified:newUser.isVerified,
            createdAt:newUser.createdAt
        };
    }

    signin=async (data:SigninRequestDTO):Promise<SigninResponseDTO>=>{
        const {email,password}=data

        logger.debug("Hitted on authService in signin")

        const user=await this.userRepository.findUserByEmail(email)

        if(!user){
            throw new AppError(`Dont have an account using this email`,400)
        }

        const isPassword=await comparePassword(password,user.password)

        if(!isPassword){
            throw new AppError("Invalid password entered",400)
        }

        const payload:TokenUserPayload={
            user_Id:String(user._id),
            email:user.email
        }

        const accessToken=generateAccessToken(payload)
        const refreshToken=generateRefreshToken(payload)

        await this.tokenStore.setItem<string>(refreshToken,user._id.toString(), 7 * 24 * 60 * 60)

        return {
            userId:user._id.toString(),
            email:user.email,
            fullname:user.fullname,
            isBlocked:user.isBlocked,
            createdAt:user.createdAt,
            isVerified:user.isVerified,
            phone:user.phone,
            accessToken,
            refreshToken,
        }

    }
    getMe=async(data: string):Promise<GetMeResponseDTO> =>{

            if(!mongoose.Types.ObjectId.isValid(data)){
                throw new AppError("INVALID_USER",401)
            }

            const user=await this.userRepository.findUserById(data)

            if(!user){
                throw new AppError("USER_NOT_FOUND",404)
            }

            return {
                userId: user._id.toString(),
                email: user.email,
                fullname: user.fullname,
                phone: user.phone,
                isVerified: user.isVerified,
                createdAt: user.createdAt,
                isBlocked: user.isBlocked
            }
    }

    refresh=async(data: string):Promise<RefreshResponseDTO>=> { //here data is the refreshtoken

        if(!data){
            throw new AppError("NOT_AUTHENTICATED",401);
        }

        let decoded: TokenUserPayload;
        
        try {
            decoded=verifyToken<TokenUserPayload>(data,ENV.REFRESH_TOKEN_SECRET)
        } catch (error:any) {
            if (error.name === "TokenExpiredError") {
                throw new AppError("REFRESH_TOKEN_EXPIRED", 401);
            }
            throw new AppError("INVALID_REFRESH_TOKEN", 401);
        }

        if(!decoded.user_Id){
            throw new AppError("INVALID_REFRESH_TOKEN",401);
        }

        const storedUserId=await this.tokenStore.getItem<string>(data)

        if(!storedUserId || storedUserId !== decoded.user_Id){
            throw new AppError("INVALID_REFRESH_TOKEN",401)
        }

        await this.tokenStore.deleteItem(data);

        const newAccessToken=generateAccessToken({
            user_Id:decoded.user_Id,
            email:decoded.email
        })

        const newRefreshToken=generateRefreshToken({
            user_Id:decoded.user_Id,
            email:decoded.email
        })


        await this.tokenStore.setItem<string>(newRefreshToken,decoded.user_Id.toString(),7 * 24 * 60 * 60)

        return {newAccessToken,newRefreshToken}

    }



}   