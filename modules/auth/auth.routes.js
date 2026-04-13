import { Router } from "express";
import validate from "../../common/middlewares/validate.middleware.js";
import {
  authenticate,
  restrictToAuthenticatedUser,
} from "../../common/middlewares/authenticate.middleware.js";
import { signInPayloadModel, signUpPayloadModel } from "./auth.models.js";
import AuthController from "./auth.controller.js";

const authRouter = (pool) => {
  const router = Router();
  const controller = new AuthController(pool);

  router.post(
    "/sign-up",
    validate(signUpPayloadModel),
    controller.handleSignup(),
  );
  router.post(
    "/sign-in",
    validate(signInPayloadModel),
    controller.handleSignin(),
  );
  router.post(
    "/logout",
    authenticate(),
    restrictToAuthenticatedUser(),
    controller.handleLogout(),
  );

  return router;
};

export default authRouter;
