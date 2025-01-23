require("dotenv").config();

const express = require("express");
const cors = require("cors");

require("./connection");

const app = express();
const User = require("./models/user");

app.use(express.json());
app.options('*', cors());

app.use(cors());

// app.use(
//   cors({
//     origin: [process.env.ORIGIN],
//     credentials: true
//   })
// );

const PORT = process.env.PORT;

const productRouter = require("./routes/productRouter");
const cartRouter = require("./routes/cartRouter");
const authenticateToken = require("./middleware/authMiddleware");

app.use(authenticateToken);

app.use("/products", productRouter);
app.use("/cart", cartRouter);

app.get("/users/me", async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
