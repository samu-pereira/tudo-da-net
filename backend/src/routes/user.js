import { Router } from "express";
import { checkToken } from "../controllers/middlewares.js";

const router = Router();

router.get("/api/user", checkToken, async (req, res) => {
  const { userId, username } = req.session;

  console.log("User ID from Token ------> ", userId);
  console.log("Username from Token ------> ", username);

  res.status(200).send({ userId, username });
});

export default router;
