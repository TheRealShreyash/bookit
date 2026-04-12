import ApiResponse from "../../common/utils/api-response.js";
import { signIn, signUp } from "./auth.services.js";

class AuthController {
  async handleSignup(pool) {
    return async (req, res) => {
      try {
        const result = await signUp(req.body, pool);
        ApiResponse.created(res, "User was registered successfully", {
          id: result.id,
        });
      } catch (error) {
        return ApiResponse.error(res, error);
      }
    };
  }

  async handleSignIn(pool) {
    return async (req, res) => {
      try {
        const { accessToken, refreshToken, user } = await signIn(
          req.body,
          pool,
        );

        req.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSize: "strict",
          maxAge: 24 * 60 * 60 * 1000,
        });
        req.user = user;

        ApiResponse.ok(res, "Signed in", { accessToken });
      } catch (error) {
        return ApiResponse.error(res, error);
      }
    };
  }
}

export default AuthController;
