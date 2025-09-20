const express = require("express");
const router = express.Router();
const userController = require("../controllers/authController");

router.get("/register", userController.showRegister);
router.post("/register", userController.register);
router.get("/login", userController.showLogin);
router.post("/login", userController.login);
router.get("/forgot-password", userController.showForgotPassword);
router.post("/forgot-password", userController.forgotPassword);
router.get("/logout", userController.logout);

module.exports = router;