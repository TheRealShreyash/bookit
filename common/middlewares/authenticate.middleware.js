import { verifyUserAccessToken } from "../../modules/auth/utils/token.js";
import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";

export const authenticate = () => {
  return (req, res, next) => {
    try {
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
    } catch (error) {
      ApiResponse.error(
        res,
        ApiError.unauthorized("Session expired or invalid token"),
      );
    }
  };
};

export const restrictToAuthenticatedUser = () => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        const acceptsHtml = req.headers["accept"]?.includes("text/html");
        if (acceptsHtml) {
          return res.redirect("/login");
        }
        return res.status(401).json({
          success: false,
          message: "Authentication required",
        });
      }
      next();
    } catch (error) {
      ApiResponse.error(res, ApiError.badRequest("User not logged in"));
    }
  };
};
