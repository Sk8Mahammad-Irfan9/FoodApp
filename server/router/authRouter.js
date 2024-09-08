const express = require("express");
const {
  authRegisterController,
  authLoginController,
  testController,
  getAllOrderController,
} = require("../controller/authController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddlewares");

const router = express.Router();

router.post("/register", authRegisterController);
router.post("/login", authLoginController);
router.get("/test", requireSignIn,isAdmin, testController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrderController);

// Protected admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

module.exports = router;
