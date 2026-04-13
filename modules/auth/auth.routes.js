import { Router } from "express";
import validate from "../../common/middlewares/validate.middleware.js";
import restrictToAuthenticatedUser from "../../common/middlewares/authenticate.middleware.js";
import { signInPayloadModel, signUpPayloadModel } from "./auth.models.js";
import AuthController from "./auth.controller.js";

const authRouter = (pool) => {
  const router = Router();
  const controller = new AuthController(pool);

  router.post(
    "/sign-up",
    validate(signUpPayloadModel),
    controller.handleSignup().bind(AuthController),
  );
  router.post(
    "/sign-in",
    validate(signInPayloadModel),
    controller.handleSignin().bind(AuthController),
  );
  router.post(
    "/logout",
    restrictToAuthenticatedUser(),
    controller.handleLogout().bind(AuthController),
  );

  return router;
};

export default authRouter;
