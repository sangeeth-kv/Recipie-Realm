import { GetMeResponseDTO } from "../../../dtos/authDTOs/getMeResponse.dto";
import { GetProfileByIdRequestDTO, GetProfileResponseDTO, GetProfilesResponseDTO} from "../../../dtos/profileDTOs/getProfileResponse.dto";
import { RefreshResponseDTO } from "../../../dtos/authDTOs/refreshResponse.dto";
import { IInternalSigninResponseDTO, SigninRequestDTO, SigninResponseDTO } from "../../../dtos/authDTOs/signin.dto";
import { SignupRequestDTO } from "../../../dtos/authDTOs/signup.dto";
import { SignupResponseDTO } from "../../../dtos/authDTOs/signup.dto";
import { TokenUserPayload } from "../../../types/TokenUserPayload";
import { IUserModel } from "../IuserModel";
import { UpdateProfileDTO,  } from "../../../dtos/profileDTOs/updateProfileResponse.dto";

export interface IProfileUserService {
  getProfiles(currentUserId:string,page:number,limit:number,search?:string): Promise<GetProfilesResponseDTO>;
  getProfileById(userId: string):Promise<GetProfileResponseDTO>;
  updateProfile(userId:string,data: UpdateProfileDTO):Promise<GetProfileResponseDTO>;
//   refresh(data:string):Promise<RefreshResponseDTO>;
  
}