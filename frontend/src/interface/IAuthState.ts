import type { IUser } from "./IUser";

export interface IAuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  loading: boolean;
}