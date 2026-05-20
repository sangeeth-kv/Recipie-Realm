import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../../../types/AuthenticatedRequestType";

export interface IProfileUserController {
  getProfiles: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
  getProfileById:(req:Request,res:Response,next:NextFunction)=>Promise<void>;
  updateProfile:(req:Request,res:Response,next:NextFunction)=>Promise<void>;
//   refresh:(req:Request,res:Response,next:NextFunction)=>Promise<void>;
}