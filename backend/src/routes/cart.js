import { Router } from "express";
import { User } from "../models/user.js";
import { checkToken } from "../controllers/middlewares.js";

const router = Router();

router.put("/api/cart", checkToken, async (req, res) => {
  const { _id, quantity, userId } = req.body;
  const item = { _id, quantity };

  try {
    const user = await User.findById(userId);
    console.log("Check User in cart -------> ", user);

    const existingItem = user.cart.find((cartItem) => cartItem._id === _id);
    existingItem ? (existingItem.quantity += quantity) : user.cart.push(item);

    await user.save();
    console.log("User Updated ------> ", user);

    return res.status(201).send({ item, updatedUser: user });
  } catch (error) {
    console.log("User Updated Error ------> ", error);
    return res.send({ msg: error });
  }
});

router.post("/api/cart", checkToken, async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId).populate("cart._id");
    const populatedCart = user.cart;

    console.log("Populate Cart ------> ", populatedCart);
    return res.status(200).send(populatedCart);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Erro ao buscar o carrinho" });
  }
});

export default router;
