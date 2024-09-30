import { Router } from "express";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import { comparePassword } from "../controllers/helpers.js";

const router = Router();

router.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const findUser = await User.findOne({ username });

  try {
    if (!findUser) throw new Error("User not found");
    if (!comparePassword(password, findUser.password)) {
      throw new Error("Incorrect Password");
    }

    req.session.user = findUser;
    const secret =
      "c2c992ed5bb6e3e4c4a23b6e1e7154231b6f8e82e9e3b7f4f3bfe786dcd05a13a1d6e7c4f9d9c8b2e5d3c7f9f5e3d7b1";
    const token = jwt.sign(
      { id: findUser._id, username: findUser.username },
      secret
    );

    const userData = {
      _id: findUser._id,
      username: findUser.username,
      cart: findUser.cart,
    };

    console.log("User ----->", userData);
    return res.status(200).send({ msg: "Logged In", token, userData });
  } catch (error) {
    return res.status(401).send({ msg: error.message });
  }
});

export default router;
