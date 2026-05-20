import logger from "../../config/logger";
import { IUserModel } from "../../interface/user/IuserModel";
import { IAuthUserRepository } from "../../interface/user/Auth/IAuthUserRepository";
import { UserDocument, UserModel } from "../../models/user_model";
import { Signup } from "../../types/Signup";
import { BaseRepository } from "../baseRepository";
import { IProfileUserRepository } from "../../interface/user/profilesInterface/IProfileUserRepository";
import { GetProfilesResponseDTO, PaginatedProfilesRepositoryResponse } from "../../dtos/profileDTOs/getProfileResponse.dto";




export default class ProfileUserRepository extends BaseRepository<IUserModel> implements IProfileUserRepository{
    constructor() {
        super(UserModel);
    }

    async findProfiles(currentUserId:string,page:number,limit:number,search?:string):Promise<PaginatedProfilesRepositoryResponse>{

        const skip=(page-1)*limit

        const filter:any = {
            isDeleted:false,
            isBlocked:false,

            _id:{
                $ne:currentUserId,
            },
        }

        if(search?.trim()){
            filter.$or = [
               { fullname: { $regex: search, $options:"i" } },
               { userName: { $regex: search, $options:"i" } }
            ]
        }

        const [users,totalUsers]=await Promise.all([
            this._model.find(filter).sort({ createdAt: -1 }).select("-password").skip(skip).limit(limit).lean(),
            this._model.countDocuments(filter),
        ])


        return {users,totalUsers,totalPages:Math.ceil(totalUsers/limit)}



    }

    async findProfileById(data: string): Promise<IUserModel | null> {

        return await this._model.findById(data)
    }

    async updateProfile(userId: string, data: Partial<IUserModel>): Promise<IUserModel | null> {
        return this._model.findByIdAndUpdate(userId,data,{new:true})
    }

}