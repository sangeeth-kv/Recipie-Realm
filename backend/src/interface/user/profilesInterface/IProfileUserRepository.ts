
import { PaginatedProfilesResponse } from "../../../dtos/profileDTOs/getProfileResponse.dto";
import { Signup } from "../../../types/Signup";
import { IUserModel } from "../IuserModel";

export interface IProfileUserRepository {

    findProfileById(data:string):Promise<IUserModel|null>;
    findProfiles(currentUserId:string,page:number,limit:number,search?: string):Promise<PaginatedProfilesResponse>;
    updateProfile(userId:string,data: Partial<IUserModel>):Promise<IUserModel|null>;

}