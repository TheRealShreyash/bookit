import { Router } from "express";

const authRouter = Router();

authRouter.post('/sign-up')
authRouter.post('/sign-in')
authRouter.post('/logout')

export default authRouter;
