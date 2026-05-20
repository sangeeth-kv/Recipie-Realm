import { SigninRequestDTO, IInternalSigninResponseDTO } from "../../dtos/authDTOs/signin.dto";
import { GetProfileByIdRequestDTO, GetProfileResponseDTO, GetProfilesResponseDTO } from "../../dtos/profileDTOs/getProfileResponse.dto";
import { IUserModel } from "../../interface/user/IuserModel";
import { IProfileUserRepository } from "../../interface/user/profilesInterface/IProfileUserRepository";
import { IProfileUserService } from "../../interface/user/profilesInterface/IProfileUserService";
import { AppError } from "../../utils/AppError";



export class ProfileUserService implements IProfileUserService{
    constructor(private profileUserRepository:IProfileUserRepository){}

    getProfiles=async (currentUserId:string,page:number,limit:number,search?:string):Promise<GetProfilesResponseDTO>=>{
        const result =await this.profileUserRepository.findProfiles(currentUserId,page,limit,search)

        console.log("users in get Profile : ",result)

        return{
         users: result.users.map(user => ({
        _id: user._id.toString(),
        fullname: user.fullname,
        userName: user.userName,
        bio: user.bio,
        profilePic: user.profilePic,
        followersCount:
          user.followers.length,
        followingCount:
          user.following.length,
        isPremium: user.isPremium,

        })),
         totalPage: result.totalPages,
         totalUsers: result.totalUsers,

        }

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