import ApiResponse from "../../common/utils/api-response.js";
import { signUp } from "./auth.services.js";

class AuthController {
  async handleSignup(pool) {
    return async (req, res) => {
      try {
        const result = await signUp(req.body);
        ApiResponse.created(res, "User was registered successfully", {
          id: result.id,
        });
      } catch (error) {
        return ApiResponse.error(res, error);
      }
    };
  }
}

export default AuthController;
