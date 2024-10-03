import { Router } from "express";
import { Product } from "../models/product.js";
import { checkToken } from "../controllers/middlewares.js";

const router = Router();

router.post("/api/products", async (req, res) => {
  const data = req.body;
  const newProduct = new Product(data);

  try {
    const savedProduct = await newProduct.save();
    return res.status(201).send(savedProduct);
  } catch (error) {
    console.log(error);
  }
});

router.put("/api/products/:id", async (req, res) => {
  const id = req.params.id;
  const { stock } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { stock },
      { new: true }
    );
    return res.status(201).send(updatedProduct);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: error });
  }
});

router.put("/api/products", checkToken, async (req, res) => {
  const { userCart } = req.body;

  try {
    const updatedProducts = await Promise.all(
      userCart.map(async (item) => {
        const product = await Product.findById(item._id);

        if (product.stock < item.quantity) {
          return res.status(400).send({
            msg: `Estoque insuficiente para o produto ${product.info}`,
            item: {
              id: product._id,
              stock: product.stock,
            },
          });
        }

        product.stock -= item.quantity;

        await product.save();

        return product;
      })
    );

    return res
      .status(201)
      .send({ msg: "Pagamento Recebido!", updatedProducts });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: error });
  }
});

router.get("/api/products", async (req, res) => {
  const products = await Product.find();
  return res.send(products);
});

router.get("/api/products/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    // console.log("Product By Id ------> ", product);

    return res.status(200).send(product);
  } catch (error) {
    return res.status(404).send({ msg: "Product Not Found" });
  }
});

export default router;
