import { Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../models/user-model";
import Token from "../models/token-model";
import { sendingMail } from "../utils/mail";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const data = {
      email,
      password: await bcrypt.hash(password, 10),
      isVerified: false,
    };

    // Saving the user
    const user = await User.create(data);

    if (user) {
      const setToken = await Token.create({
        userId: user._id,
        token: crypto.randomBytes(16).toString("hex"),
      });

      if (setToken) {
        sendingMail({
          from: "no-reply@example.com",
          to: `${email}`,
          subject: "Account Verification Link",
          text: `Hello, please click to verify your email,
        Please verify your email by clicking this link :
        ${process.env.CLIENT_API}/verify-email/${user._id}/${setToken.token} `,
        });
      } else {
        return res.status(400).send({ message: "Token not created" });
      }

      return res
        .status(201)
        .send({
          message: "Verification link is sent to your email account!! ",
        });
    } else {
      return res.status(409).send({ message: "Details are not correct" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token, id } = req.params;
    const usertoken = await Token.findOne({
      token,
      userId: id,
    });

    if (!usertoken) {
      return res.status(400).send({
        msg: "Your verification link may have expired. Please click on resend for verify your Email.",
      });
    } else {
      const user = await User.findOne({ _id: id });

      if (!user) {
        return res.status(401).send({
          msg: "We were unable to find a user for this verification. Please SignUp!",
        });
      } else if (user.isVerified) {
        return res
          .status(200)
          .send("User has been already verified. Please Login");
      } else {
        const updated = await User.updateOne(
          { _id: id },
          {
            $set: {
              isVerified: true,
            },
          }
        );

        if (!updated) {
          return res.status(500).send({ msg: "Failed to update user status" });
        } else {
          return res.status(200).send({ accessToekn: token, user: user });
        }
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const isSame = await bcrypt.compare(password, user.password);

      if (isSame) {
        const verified = user.isVerified;
        if (verified) {
          const token = jwt.sign(
            { id: user.id },
            process.env.SECRETKEY || user.id,
            {
              expiresIn: 1 * 24 * 60 * 60 * 1000,
            }
          );

          return res.status(201).send({ accessToken: token, user: user });
        } else {
          return res.status(401).send("User not verified");
        }
      } else {
        return res.status(401).send("Authentication failed");
      }
    } else {
      console.log(user, User);
      return res.status(401).send("Authentication failed");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
