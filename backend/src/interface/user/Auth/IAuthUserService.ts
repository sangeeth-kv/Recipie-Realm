import { GetMeResponseDTO } from "../../../dtos/authDTOs/getMeResponse.dto";
import { RefreshResponseDTO } from "../../../dtos/authDTOs/refreshResponse.dto";
import { IInternalSigninResponseDTO, SigninRequestDTO, SigninResponseDTO } from "../../../dtos/authDTOs/signin.dto";
import { SignupRequestDTO } from "../../../dtos/authDTOs/signup.dto";
import { SignupResponseDTO } from "../../../dtos/authDTOs/signup.dto";
import { TokenUserPayload } from "../../../types/TokenUserPayload";

export interface IAuthUserService {
  signup(data: SignupRequestDTO): Promise<SignupResponseDTO>;
  signin(data: SigninRequestDTO):Promise<IInternalSigninResponseDTO>;
  getMe(data:string):Promise<GetMeResponseDTO>;
  refresh(data:string):Promise<RefreshResponseDTO>;
  
}