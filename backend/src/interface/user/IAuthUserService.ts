import { GetMeResponseDTO } from "../../dtos/getMeResponse.dto";
import { RefreshResponseDTO } from "../../dtos/refreshResponse.dto";
import { SigninRequestDTO, SigninResponseDTO } from "../../dtos/signin.dto";
import { SignupRequestDTO } from "../../dtos/signup.dto";
import { SignupResponseDTO } from "../../dtos/signup.dto";
import { TokenUserPayload } from "../../types/TokenUserPayload";

export interface IAuthUserService {
  signup(data: SignupRequestDTO): Promise<SignupResponseDTO>;
  signin(data: SigninRequestDTO):Promise<SigninResponseDTO>;
  getMe(data:string):Promise<GetMeResponseDTO>;
  refresh(data:string):Promise<RefreshResponseDTO>;
}