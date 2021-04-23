const order = require("../models/order");
const { Order, ProductCart } = require("../models/order");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "Np order found in DB",
        });
      }
      req.order = order;
      next();
    });
};

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "Failed To save your order",
      });
    }
    res.json(order);
  });
};

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: "No Order Found",
        });
      }
      res.json(orders);
    });
};

exports.updateStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    {
      $set: { status: req.body.status },
    },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: "Cannot Upadate Order Status",
        });
      }
      res.json(order);
    }
  );
};

exports.getOrderdStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};
