import { Router } from "express";
import signupRouter from "./signup.js";
import loginRouter from "./login.js";
import userRouter from "./user.js";
import productsRouter from "./products.js";
import cartRouter from "./cart.js";

const router = Router();

router.use(signupRouter);
router.use(loginRouter);
router.use(userRouter);
router.use(productsRouter);
router.use(cartRouter);

export default router;
