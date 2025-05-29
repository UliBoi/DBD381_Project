const express = require("express");
const router = express.Router();

const Product = require("./models/Product");
const User = require("./models/User");
const Order = require("./models/Order");

//Delete Queries

//Delete product by ID
router.delete("/delete-product/:id", async (req, res) => {
  try {
    const result = await Product.deleteOne({ product_id: req.params.id });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Delete user by ID
router.delete("/delete-user/:id", async (req, res) => {
  try {
    const result = await User.deleteOne({ user_id: req.params.id });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Delete order by ID
router.delete("/delete-order/:id", async (req, res) => {
  try {
    const result = await Order.deleteOne({ order_id: req.params.id });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


//Search Queries

//Search product by ID
router.get("/search-product/:id", async (req, res) => {
  try {
    const result = await Product.findOne({ product_id: req.params.id });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


//Search users by ID
router.get("/search-users/:id", async (req, res) => {
  try {
    const users = await User.find({ user_id: req.params.id });
    res.json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Join Queries

//Get orders with product and user info
router.get("/order-details", async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "products.product_id",
          foreignField: "product_id",
          as: "product_info"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "user_id",
          as: "user_info"
        }
      },
      {
        $project: {
          order_id: 1,
          order_total: 1,
          order_status: 1,
          "product_info.product_name": 1,
          "user_info.user_name": 1
        }
      }
    ]);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;