import { AuthUserService } from "../services/authServices/auth.user_service";
import { AuthUserController } from "../controller/authController/auth.user_controller";
import { RedisHelper } from "../helpers/redisHelper";
import AuthUserRepository from "../repository/authRepository/auth.user_repository";
import { TokenService } from "../services/authServices/token_service";
import { AuthMiddleware } from "../middlewares/authMiddleware";

const redisHelper=new RedisHelper()
const tokenService=new TokenService()
const authUserRepository=new AuthUserRepository();
const authUserService=new AuthUserService(authUserRepository,redisHelper,tokenService)
const authUserController=new AuthUserController(authUserService)


//middelware for auth
const authMiddleware=new AuthMiddleware(tokenService)

export {authUserController,authMiddleware  }