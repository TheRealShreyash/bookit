import ApiResponse from "../../common/utils/api-response.js";
import { logout, signIn, signUp } from "./auth.services.js";

class AuthController {
  constructor(pool) {
    this.pool = pool;
  }
  handleSignup() {
    return async (req, res) => {
      try {
        const result = await signUp(req.body, this.pool);
        ApiResponse.created(res, "User was registered successfully", {
          id: result.id,
        });
      } catch (error) {
        return ApiResponse.error(res, error);
      }
    };
  }

  handleSignin() {
    return async (req, res) => {
      try {
        const { accessToken, refreshToken } = await signIn(req.body, this.pool);

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSize: "strict",
          maxAge: 24 * 60 * 60 * 1000,
        });

        ApiResponse.ok(res, "Signed in", { accessToken });
      } catch (error) {
        return ApiResponse.error(res, error);
      }
    };
  }

  handleLogout() {
    return async (req, res) => {
      try {
        await logout(req, this.pool);

        res.clearCookie("refreshToken", {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        });

        ApiResponse.ok(res, "Logged out successfully");
      } catch (error) {
        return ApiResponse.error(res, error);
      }
    };
  }
}

export default AuthController;
