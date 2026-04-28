import { UserDocument } from "../../models/user_model";
import { Signup } from "../../types/Signup";
import { IUserModel } from "./IuserModel";

export interface IAuthUserRepository {

    findUserByEmail(data:string):Promise<IUserModel|null>;
    createUser(data:Signup):Promise<IUserModel>;
    findUserById(data:string):Promise<IUserModel|null>;

}