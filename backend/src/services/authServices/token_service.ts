import { ITokenService } from "../../interface/ITokenService";
import { generateAccessToken, generateRefreshToken, verifyToken } from "../../utils/jwt";

export class TokenService implements ITokenService {

    generateAccessToken<T extends object>(payload: T): string {
        return generateAccessToken(payload);
    }

    generateRefreshToken<T extends object>(payload: T): string {
        return generateRefreshToken(payload);
    }

    verifyToken<T>(token: string,TOKEN_SECRET:string): T {
        return verifyToken(token,TOKEN_SECRET)
    }
}