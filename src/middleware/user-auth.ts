import { Request, Response, NextFunction } from "express";
import User from "../models/user-model";

const saveUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
     const emailCheck = await User.findOne({email: req.body.email});

    if (emailCheck) {
      return res.status(409).send("Email already taken");
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export default saveUser;
