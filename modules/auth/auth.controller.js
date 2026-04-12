import { signUp } from "./auth.services.js";

class AuthController {
  static async handleSignup(req, res) {
    try {
      const payload = req.body;
      await signUp(payload, pool);
    } catch (error) {}
  }
}

export default AuthController;
