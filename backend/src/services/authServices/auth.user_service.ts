import { AppError } from "../../utils/AppError";
import logger from "../../config/logger";
import { comparePassword, hashPassword } from "../../utils/hashPassword";
import { SignupRequestDTO, SignupResponseDTO } from "../../dtos/authDTOs/signup.dto";
import { IAuthUserRepository } from "../../interface/user/Auth/IAuthUserRepository";
import { IAuthUserService } from "../../interface/user/Auth/IAuthUserService";
import { IInternalSigninResponseDTO, SigninRequestDTO, SigninResponseDTO } from "../../dtos/authDTOs/signin.dto";
import { TokenUserPayload } from "../../types/TokenUserPayload";
import { generateAccessToken, generateRefreshToken, verifyToken } from "../../utils/jwt";
import { ITokenStore } from "../../interface/IRedisHelper";
import { GetMeResponseDTO } from "../../dtos/authDTOs/getMeResponse.dto";
import mongoose from "mongoose";
import { ENV } from "../../config/env";
import { RefreshResponseDTO } from "../../dtos/authDTOs/refreshResponse.dto";
import { ITokenService } from "../../interface/ITokenService";

export class AuthUserService implements IAuthUserService {
    constructor(
        private userAuthRepository: IAuthUserRepository,
        private tokenStore:ITokenStore,
        private tokenService:ITokenService
    ){}

    //for signup user

    signup=async (data:SignupRequestDTO): Promise<SignupResponseDTO>=>{ //used signup data transfer object 

        const {email,fullname,password,phone}=data

        logger.debug("Hitted on AuthService in Signup")

        const user=await this.userAuthRepository.findUserByEmail(email);

        if(user){
            throw new AppError("User already exists", 400);
        }

        logger.debug("After user already exists check in Signup Authservice")

        const hashedPassword= await hashPassword(password)

        logger.debug(`Hashed password is ${hashedPassword}`)

        const newUser=await this.userAuthRepository.createUser({
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

    signin=async (data:SigninRequestDTO):Promise<IInternalSigninResponseDTO>=>{
        const {email,password}=data

        logger.debug("Hitted on authService in signin")

        const user=await this.userAuthRepository.findUserByEmail(email)

        console.log("User : ",user)

        if(!user){
            throw new AppError(`Dont have an account using this email`,400)
        }

        if(user.isBlocked){
            throw new AppError("User is currently blocked",403)
        }

        if(user.isDeleted){
            throw new AppError("User account is deleted",404)
        }

        const isPassword=await comparePassword(password,user.password)

        if(!isPassword){
            throw new AppError("Invalid password entered",400)
        }

        const payload:TokenUserPayload={
            userId:String(user._id),
            email:user.email,
            role:user.role,
        }

        const accessToken=this.tokenService.generateAccessToken(payload)
        const refreshToken=this.tokenService.generateRefreshToken(payload)

        await this.tokenStore.setItem<string>(refreshToken,user._id.toString(), 7 * 24 * 60 * 60)

        console.log("Redis stored token: 11 ", await this.tokenStore.getItem(refreshToken));


        return {
            userId:user._id.toString(),
            email:user.email,
            fullname:user.fullname,
            isBlocked:user.isBlocked,
            role:user.role,
            createdAt:user.createdAt,
            isVerified:user.isVerified,
            phone:user.phone,
            userName:user.userName,
            isDeleted:user.isDeleted,
            bio:user.bio,
            followers:user.followers.map(id => id.toString()),
            following:user.following.map(id=>id.toString()),
            savedRecipes: user.savedRecipes.map(id => id.toString()),
            PremiumMember:user.PremiumMember,
            isPremium:user.isPremium,
            accessToken,
            refreshToken,
        }

    }
    getMe=async(data: string):Promise<GetMeResponseDTO> =>{

            if(!mongoose.Types.ObjectId.isValid(data)){
                throw new AppError("INVALID_USER",401)
            }

            const user=await this.userAuthRepository.findUserById(data)

            if(!user){
                throw new AppError("USER_NOT_FOUND",404)
            }

            return {
                userId:user._id.toString(),
                email:user.email,
                fullname:user.fullname,
                isBlocked:user.isBlocked,
                role:user.role,
                createdAt:user.createdAt,
                isVerified:user.isVerified,
                phone:user.phone,
                userName:user.userName,
                isDeleted:user.isDeleted,
                bio:user.bio,
                followers:user.followers.map(id => id.toString()),
                following:user.following.map(id=>id.toString()),
                savedRecipes: user.savedRecipes.map(id => id.toString()),
                PremiumMember:user.PremiumMember,
                isPremium:user.isPremium,
            }
    }

    refresh=async(data: string):Promise<RefreshResponseDTO>=> { //here data is the refreshtoken

        if(!data){
            throw new AppError("NOT_AUTHENTICATED",401);
        }

        let decoded: TokenUserPayload;
        
        try {
            decoded=this.tokenService.verifyToken<TokenUserPayload>(data,ENV.REFRESH_TOKEN_SECRET)
        } catch (error:any) {
            if (error.name === "TokenExpiredError") {
                throw new AppError("REFRESH_TOKEN_EXPIRED", 401);
            }
            throw new AppError("INVALID_REFRESH_TOKEN", 401);
        }

        if(!decoded.userId){
            throw new AppError("INVALID_REFRESH_TOKEN",401);
        }

        const storedUserId=await this.tokenStore.getItem<string>(data)

        if(!storedUserId || storedUserId !== decoded.userId){
            throw new AppError("INVALID_REFRESH_TOKEN",401)
        }

        console.log("Redis stored token: 11 ", await this.tokenStore.getItem(data));

        await this.tokenStore.deleteItem(data);

        console.log("Redis stored token:12 ", await this.tokenStore.getItem(data));

        const newAccessToken=this.tokenService.generateAccessToken({
            userId:decoded.userId,
            email:decoded.email
        })

        const newRefreshToken=this.tokenService.generateRefreshToken({
            userId:decoded.userId,
            email:decoded.email
        })


        await this.tokenStore.setItem<string>(newRefreshToken,decoded.userId.toString(),7 * 24 * 60 * 60)

        return {newAccessToken,newRefreshToken}

    }



}   