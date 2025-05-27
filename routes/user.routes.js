const express = require("express");
const router = express.Router();
const {
  register,
  login,
  updateUser,
} = require("../controllers/user.controller");
const { protect } = require("../middlewares/authMiddlewares");

router.route("/register").post(register);
router.route("/login").post(login);

router.route("/update/:id").patch(protect, updateUser);
router.get("/protect/testing", protect, (req, res) => {
  res.status(200).json({ message: "You are logged in", user: req.user });
});

module.exports = router;
