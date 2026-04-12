import { verifyUserAccessToken } from "../../modules/auth/utils/token.js";
import ApiError from "../utils/api-error.js";

export const authenticate = () => {
  return (req, res, next) => {
    const header = req.headers["authorization"];

    if (!header) return next();

    if (!header.startsWith("Bearer")) {
      throw ApiError.badRequest("Authorization header must start with bearer");
    }

    const token = header.split(" ")[0];

    if (!token)
      throw ApiError.badRequest("Authorization header must contain the token");

    const user = verifyUserAccessToken(token);

    req.user = user;

    next();
  };
};
