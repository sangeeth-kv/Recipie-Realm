import logger from "../../config/logger";
import { IUserModel } from "../../interface/user/IuserModel";
import { IAuthUserRepository } from "../../interface/user/Auth/IAuthUserRepository";
import { UserDocument, UserModel } from "../../models/user_model";
import { Signup } from "../../types/Signup";
import { BaseRepository } from "../baseRepository";




export default class AuthUserRepository extends BaseRepository<IUserModel> implements IAuthUserRepository{
    constructor() {
        super(UserModel);
    }

    async findUserByEmail(email:string):Promise<IUserModel | null>{
        logger.debug("Hitted UserRepository in findUser")
        return await this._model.findOne({email}).exec();
    }

    async createUser(data: Signup): Promise<IUserModel> {
        // return await UserModel.create(data)
        return this._model.create(data as Partial<IUserModel>);
    }

    async findUserById(data: string): Promise<IUserModel | null> {

        return await this._model.findById(data)
    }

}