import express from "express";
import { login, signup, verifyEmail } from "../controller/auth-controller";
import saveUser from "../middleware/user-auth"
import { addDashBoardUser, deleteDashUser, getAdminUser, getDashboardUsers, updateAdminUser } from "../controller/user-controller";

const router = express.Router();

router.post("/signup", saveUser, signup);

router.get('/verify-email/:id/:token', verifyEmail)

router.post("/adddashuser", addDashBoardUser);

router.post("/signin", login)

router.get('/getadminuser', getAdminUser)

router.patch('/updateadminuser/:id', updateAdminUser)

router.delete('/deleteuser/:id', deleteDashUser)

router.get('/getdashboardusers', getDashboardUsers)

export default router;