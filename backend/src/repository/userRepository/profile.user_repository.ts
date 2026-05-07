import logger from "../../config/logger";
import { IUserModel } from "../../interface/user/IuserModel";
import { IAuthUserRepository } from "../../interface/user/Auth/IAuthUserRepository";
import { UserDocument, UserModel } from "../../models/user_model";
import { Signup } from "../../types/Signup";
import { BaseRepository } from "../baseRepository";
import { IProfileUserRepository } from "../../interface/user/profilesInterface/IProfileUserRepository";




export default class ProfileUserRepository extends BaseRepository<IUserModel> implements IProfileUserRepository{
    constructor() {
        super(UserModel);
    }

    async findProfiles(search?:string):Promise<IUserModel[]>{
        const filter:any = {
            isDeleted:false,
            isBlocked:false
        }

        if(search){
            filter.$or = [
               { fullname: { $regex: search, $options:"i" } },
               { userName: { $regex: search, $options:"i" } }
            ]
        }

        return this._model.find(filter).select("-password")

    }

    async findProfileById(data: string): Promise<IUserModel | null> {

        return await this._model.findById(data)
    }

    async updateProfile(userId: string, data: Partial<IUserModel>): Promise<IUserModel | null> {
        return this._model.findByIdAndUpdate(userId,data,{new:true})
    }

}