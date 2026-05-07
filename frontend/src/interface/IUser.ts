export type UserRole = "USER" | "ADMIN" | "SUPER_ADMIN";
export interface IUser {
  _id: string;
  email: string;
  userName:string;
  password: string;
  phone: string;
  fullname: string;
  role:UserRole;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  isBlocked:boolean;
  isDeleted:boolean;
}