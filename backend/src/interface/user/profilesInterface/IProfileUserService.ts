import { GetMeResponseDTO } from "../../../dtos/authDTOs/getMeResponse.dto";
import { GetProfileByIdRequestDTO, GetProfileResponseDTO} from "../../../dtos/profileDTOs/getProfileResponse.dto";
import { RefreshResponseDTO } from "../../../dtos/authDTOs/refreshResponse.dto";
import { IInternalSigninResponseDTO, SigninRequestDTO, SigninResponseDTO } from "../../../dtos/authDTOs/signin.dto";
import { SignupRequestDTO } from "../../../dtos/authDTOs/signup.dto";
import { SignupResponseDTO } from "../../../dtos/authDTOs/signup.dto";
import { TokenUserPayload } from "../../../types/TokenUserPayload";
import { IUserModel } from "../IuserModel";
import { UpdateProfileDTO,  } from "../../../dtos/profileDTOs/updateProfileResponse.dto";

export interface IProfileUserService {
  getProfiles(search?:string): Promise<GetProfileResponseDTO[]>;
  getProfileById(userId: GetProfileByIdRequestDTO):Promise<GetProfileResponseDTO>;
  updateProfile(userId:string,data: UpdateProfileDTO):Promise<GetProfileResponseDTO>;
//   refresh(data:string):Promise<RefreshResponseDTO>;
  
}