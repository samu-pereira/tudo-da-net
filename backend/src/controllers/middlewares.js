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
    const id = decodedToken.id;
    const username = decodedToken.username;

    if (!req.session.user) req.session.user = await User.findById(id);

    console.log("User by Token ------> ", req.session.user);

    console.log("id ------> ", id);
    res.send(id, username);
    next();
  } catch (err) {
    res.status(400).send({ msg: "Token inválido" });
  }
};

export const checkUser = (req, res, next) => {
  if (!req.session.user)
    return res.status(401).send({ msg: "Please Log in First" });
  console.log("logged");
  next();
};
