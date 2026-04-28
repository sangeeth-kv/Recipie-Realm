import { UserRole } from "../interface/user/IuserModel";

export interface SigninRequestDTO {
  email: string;
  password: string;
}

export interface SigninResponseDTO {
  userId: string;
  email: string;
  fullname: string;
  phone: string;
  role:UserRole;
  isVerified: boolean;
  createdAt: Date;
  isBlocked:boolean;
  refreshToken:string;
  accessToken:string;
}