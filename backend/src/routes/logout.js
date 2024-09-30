import { Router } from "express";

const router = Router();

router.post("/api/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send({ msg: "Failed to logout" });
    }
    res.status(200).send({ msg: "Logged out successfully" });
  });
});

export default router;
