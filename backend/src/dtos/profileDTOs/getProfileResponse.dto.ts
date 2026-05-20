import { IUserModel } from "../../interface/user/IuserModel";

export interface GetProfileResponseDTO {
  _id:string;
  fullname:string;
  userName:string;
  bio:string;
  profilePic?:string;

  followersCount:number;
  followingCount:number;

  isPremium:boolean;
}

export interface GetProfilesResponseDTO{
  users: GetProfileResponseDTO[];
  totalPage: number;
  totalUsers: number;
}

export interface GetProfileByIdRequestDTO {
   userId: string;
}

export interface PaginatedProfilesResponse {
  users: IUserModel[];
  totalUsers: number;
  totalPages: number;
}



export interface PaginatedProfilesRepositoryResponse {
  users: IUserModel[];
  totalUsers: number;
  totalPages: number;
}