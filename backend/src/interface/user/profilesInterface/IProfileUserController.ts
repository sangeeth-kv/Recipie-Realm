import { NextFunction, Request, Response } from "express";

export interface IProfileUserController {
  getProfiles: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  getProfileById:(req:Request,res:Response,next:NextFunction)=>Promise<void>;
  updateProfile:(req:Request,res:Response,next:NextFunction)=>Promise<void>;
//   refresh:(req:Request,res:Response,next:NextFunction)=>Promise<void>;
}