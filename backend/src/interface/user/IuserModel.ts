import { Types,Document } from "mongoose";
export type UserRole = "USER" | "ADMIN" | "SUPER_ADMIN";
export interface IUserModel extends Document {
  _id: Types.ObjectId;
  email: string;
  userName:string;
  password: string;
  phone: string;
  fullname: string;
  role:UserRole;
  isVerified: boolean;
  profilePic:string;
  createdAt: Date;
  updatedAt: Date;
  isBlocked:boolean;
  isDeleted:boolean;
  bio:string;
  followers:Types.ObjectId[];
  following:Types.ObjectId[];
  savedRecipes:Types.ObjectId[];
  PremiumMember:{
    startDate:Date;
    endDate:Date;
  },
  isPremium:boolean;

}