import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  url: mongoose.Schema.Types.String,

  info: mongoose.Schema.Types.String,

  price: mongoose.Schema.Types.Number,

  stock: {
    type: mongoose.Schema.Types.Number,
    default: 0,
    min: [0, "The product is out of stock until the next stock arrives"],
  },
});

export const Product = mongoose.model("Product", ProductSchema);
