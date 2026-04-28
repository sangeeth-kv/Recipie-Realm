export interface ITokenService {
  generateAccessToken<T extends object>(payload: T): string;

  generateRefreshToken<T extends object>(payload: T): string;

  verifyToken<T>(token: string,TOKEN_SECRET:string): T;
}