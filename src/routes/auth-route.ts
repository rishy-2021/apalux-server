import express from "express";
import { login, signup, verifyEmail } from "../controller/auth-controller";
import saveUser from "../middleware/user-auth"

const authRouter = express.Router();

authRouter.post("/signup", saveUser, signup);
authRouter.get('/verify-email/:id/:token', verifyEmail)
authRouter.post("/signin", login)

export default authRouter;