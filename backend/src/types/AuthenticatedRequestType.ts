import { Request } from "express";
import { TokenUserPayload } from "../types/TokenUserPayload";

export interface AuthenticatedRequest
  extends Request {

  user: TokenUserPayload;
}