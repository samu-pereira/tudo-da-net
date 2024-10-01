import { Router } from "express";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import { comparePassword } from "../controllers/helpers.js";

const router = Router();

router.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const findUser = await User.findOne({ username });

  try {
    if (!findUser) throw new Error("Username or password is incorrect");
    if (!comparePassword(password, findUser.password)) {
      throw new Error("username or password is incorrect");
    }

    req.session.user = findUser;
    const secret = process.env.SECRET;
    const token = jwt.sign(
      { id: findUser._id, username: findUser.username },
      secret
    );

    const userData = {
      _id: findUser._id,
      username: findUser.username,
      cart: findUser.cart,
    };

    console.log("User ------> ", userData);
    return res.status(200).send({ msg: "Logged In", token, userData });
  } catch (error) {
    return res.status(401).send({ msg: error.message });
  }
});

export default router;
