import { Router } from "express";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import { hashPassword } from "../controllers/helpers.js";
import { confirmPassword } from "../controllers/middlewares.js";

const router = Router();

router.post("/api/signup", confirmPassword, async (req, res) => {
  const data = req.body;
  data.password = hashPassword(data.password);
  const newUser = new User(data);

  try {
    const savedUser = await newUser.save();
    req.session.user = savedUser;
    const secret = process.env.SECRET;
    const token = jwt.sign(
      { id: savedUser._id, username: savedUser._id },
      secret
    );

    const userData = {
      _id: savedUser._id,
      username: savedUser.username,
      cart: savedUser.cart,
    };

    return res.status(201).send({ msg: "Logged In", token, userData });
  } catch (error) {
    console.log("Signup Error ------> ", error);
    if (error.code === 11000) {
      res.status(400).json({ msg: "This username is already taken" });
    } else {
      res.status(400).json({ msg: "An error occurred during sign up" });
    }
  }
});

export default router;
