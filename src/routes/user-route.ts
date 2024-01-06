import express from "express";
import { addDashBoardUser, getAdminUser, updateAdminUser, deleteDashUser, getDashboardUsers } from "../controller/user-controller";

const userRouter = express.Router();

userRouter.post("/adddashuser", addDashBoardUser);
userRouter.get('/getadminuser', getAdminUser)
userRouter.patch('/updateadminuser/:id', updateAdminUser)
userRouter.delete('/deleteuser/:id', deleteDashUser)
userRouter.get('/getdashboardusers', getDashboardUsers)

export default userRouter;