import { Router } from "express";
import validate from "../../common/middlewares/validate.middleware.js";
import { signUpPayloadModel } from "./auth.models.js";
import AuthController from "./auth.controller.js";

const authRouter = Router();

authRouter.post(
  "/sign-up",
  validate(signUpPayloadModel),
  AuthController.handleSignup,
);
authRouter.post("/sign-in");
authRouter.post("/logout");

export default authRouter;
