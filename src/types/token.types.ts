import { IAdmin } from "./admin.types";

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}

export type ITokenPayload = Pick<IAdmin, "_id" | "name">;
export type IActionTokenPayload = Pick<ITokenPayload, "_id">;
