import { SigninRequestDTO, IInternalSigninResponseDTO } from "../../dtos/authDTOs/signin.dto";
import { GetProfileByIdRequestDTO, GetProfileResponseDTO } from "../../dtos/profileDTOs/getProfileResponse.dto";
import { UpdateProfileResponseDTO } from "../../dtos/profileDTOs/updateProfileResponse.dto";
import { IUserModel } from "../../interface/user/IuserModel";
import { IProfileUserRepository } from "../../interface/user/profilesInterface/IProfileUserRepository";
import { IProfileUserService } from "../../interface/user/profilesInterface/IProfileUserService";
import { AppError } from "../../utils/AppError";



export class ProfileUserService implements IProfileUserService{
    constructor(private profileUserRepository:IProfileUserRepository){}

    getProfiles=async (search?:string)=>{
        const users =await this.profileUserRepository.findProfiles(search)

        console.log("users in get Profile : ",users)

        return users.map(user => ({
         userId:user._id.toString(),
         fullname:user.fullname,
         userName:user.userName,
         bio:user.bio,
         followersCount:user.followers.length,
         followingCount:user.following.length,
         isPremium:user.isPremium
      }))
    }

    getProfileById=async(data: GetProfileByIdRequestDTO): Promise<GetProfileResponseDTO>=> {

        const user = await this.profileUserRepository.findProfileById(data.userId);

        if (!user) {
            throw new AppError("USER_NOT_FOUND", 404);
        }

        return {
                userId: user._id.toString(),
                fullname: user.fullname,
                userName: user.userName,
                bio: user.bio,
                followers: user.followers.map(id => id.toString()),
                following: user.following.map(id => id.toString()),
            };
    }

    updateProfile=async (userId: string, data: Partial<IUserModel>): Promise<UpdateProfileResponseDTO>=> {
        
    }
}