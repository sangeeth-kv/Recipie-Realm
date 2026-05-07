
import { Signup } from "../../../types/Signup";
import { IUserModel } from "../IuserModel";

export interface IProfileUserRepository {

    findProfileById(data:string):Promise<IUserModel|null>;
    findProfiles(search?: string):Promise<IUserModel[]>;
    updateProfile(userId:string,data: Partial<IUserModel>):Promise<IUserModel|null>;

}