import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const confirmPassword = (req, res, next) => {
  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword)
    return res.status(401).send({ msg: "Password didn't match, try again." });
  next();
};

export const checkToken = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log("Token ------> ", req.headers.authorization);

  if (!token) {
    return res.status(401).send({ msg: "Please Log in First" });
  }

  try {
    const secret = process.env.SECRET;
    const decodedToken = jwt.verify(token, secret);
    req.session.userId = decodedToken.id;
    req.session.username = decodedToken.username;

    if (!req.session.user)
      req.session.user = await User.findById(decodedToken.id);

    console.log("User by Token ------> ", req.session.user);

    console.log("id ------> ", decodedToken.id);
    next();
  } catch (err) {
    res.status(400).send({ msg: "Token inválido" });
  }
};
