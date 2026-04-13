import { verifyUserAccessToken } from "../../modules/auth/utils/token.js";
import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";

export const authenticate = () => {
  return (req, res, next) => {
    const header = req.headers["authorization"];

    if (!header) return next();

    if (!header.startsWith("Bearer")) {
      return ApiResponse.error(
        res,
        ApiError.badRequest("Authorization header must start with Bearer"),
      );
    }

    const token = header.split(" ")[1];

    if (!token)
      return ApiResponse.error(
        res,
        ApiError.badRequest("Token missing from authorization header"),
      );

    const user = verifyUserAccessToken(token);

    req.user = user;

    next();
  };
};

export const restrictToAuthenticatedUser = () => {
  return (req, res, next) => {
    if (!req.user)
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    next();
  };
};
