import { Router } from "express";
import validate from "../../common/middlewares/validate.middleware.js";
import { signInPayloadModel, signUpPayloadModel } from "./auth.models.js";
import AuthController from "./auth.controller.js";

const authRouter = (pool) => {
  const router = Router();

  router.post(
    "/sign-up",
    validate(signUpPayloadModel),
    AuthController.handleSignup(pool),
  );
  router.post(
    "/sign-in",
    validate(signInPayloadModel),
    AuthController.handleSignIn(pool),
  );
  router.post("/logout");
};

export default authRouter;
