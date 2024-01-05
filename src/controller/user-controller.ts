import { NextFunction, Request, Response } from "express";
import User from "../models/user-model";
import Token from "../models/token-model";
import DashUser from "../models/dash-user-model";


export const getAdminUser = async (req: Request, res: Response) => {
    try {
        const {token, id} = req.params;

        const usertoken = await Token.findOne({
            token,
            userId: id,
        });

        if (!usertoken) {
          return res.status(400).send({
            msg: "Your verification token may have expired. Please login again",
          });
        } else {
          const user = await User.findOne({ _id: id });
          if (!user) {
            console.log(user);
            return res.status(401).send({
              msg: "We were unable to find a user. Please try again!",
            });
          }
          res.status(200).send(user)
        }
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
}

export const addDashBoardUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

    //   const existingUser: User | null = await User.findOne({ email });
    //   if (existingUser) {
    //     return res.status(400).json({ error: 'Email is already in use' });
    //   }

      const newUser = new DashUser(req.body);

      await newUser.save();
      return res.json({ message: 'added successfully' });

    } catch (error) {
      console.error('Error adding user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

export const getDashboardUsers = async (req: Request, res: Response) => {
    try {
        // const {token} = req.params;
        // const usertoken = await Token.findOne({
        //     token,
        //     userId: id,
        // });

        // if (!usertoken) {
        //   return res.status(400).send({
        //     msg: "Your verification token may have expired. Please login again",
        //   });
        // }

          const users = await DashUser.find();
          res.status(200).send(users)
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
}

export const updateAdminUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json({ success:true, user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateDashboardUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {name, address, designation} = req.body;

          const user = await User.findOne({ _id: id });
          if (!user) {
            console.log(user);
            return res.status(401).send({
              msg: "We were unable to find a user. Please try again!",
            });
          } else{

          }
          res.status(200).send(user)

      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
}

