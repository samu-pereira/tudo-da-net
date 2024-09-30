import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
    required: [true, "Username cannot be empty"],
    unique: [true, "Username already taken"],
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: [true, "Password cannot be empty"],
    minlength: 3,
  },
  cart: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

export const User = mongoose.model("User", UserSchema);
