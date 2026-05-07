import { UserRole } from "../../interface/user/IuserModel";

export interface GetMeResponseDTO {
  userId: string;
    email: string;
    fullname: string;
    phone: string;
    role:UserRole;
    isVerified: boolean;
    createdAt: Date;
    isBlocked:boolean;
    userName:string;
    bio:string;
    followers:string[];
    following:string[];
    savedRecipes:string[];
    isDeleted:boolean;
    PremiumMember:{
      startDate:Date;
      endDate:Date;
    };
    isPremium:boolean;

}