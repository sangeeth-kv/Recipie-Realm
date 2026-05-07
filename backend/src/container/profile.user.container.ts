import { ProfileUserController } from "../controller/userController/profiles.user_controller";
import ProfileUserRepository from "../repository/userRepository/profile.user_repository";
import { ProfileUserService } from "../services/userServices/profiles.user_services";






const profileUserRepository=new ProfileUserRepository()

const profileUserService=new ProfileUserService(profileUserRepository)

const profileUserController=new ProfileUserController(profileUserService)


export {profileUserController}