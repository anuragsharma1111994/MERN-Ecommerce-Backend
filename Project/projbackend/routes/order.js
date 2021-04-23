const express = require("express");
const router = express.Router();

const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const { updateStock } = require("../controllers/product");

const {
  getOrderById,
  createOrder,
  getAllOrders,
  updateStatus,
  getOrderdStatus,
} = require("../controllers/order");

// Parmas
router.param("userId", getUserById);
router.param("orderId", getOrderById);

// Actual Route

// Create
router.post(
  "order/create/:userId",
  isAuthenticated,
  isSignedIn,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
);
// Read
router.get(
  "/order/all/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
);
// Delete

// Update

//Status of Order

router.get(
  "/order/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getOrderdStatus
);
router.put(
  "/order/:orderId/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateStatus
);

module.exports = router;
