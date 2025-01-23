
const mongoose = require("mongoose");
const validator = require('validator')

const CartSchema = new mongoose.Schema({
  productId: { type: [mongoose.Schema.Types.ObjectId], ref: "Product" },
  quantity: { type: Number, required: true, default: 1 },
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email address.",
    },
  },
  password: { type: String, required: true, min: 6 },
  cart: { type: [CartSchema] },
  role: { type: String, enum: ["customer", "admin"], default: "customer" },
});

module.exports = mongoose.model("User", UserSchema);
