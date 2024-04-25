const express = require("express");
const { registerController, loginController, testController } = require("../contorllers/authController");
const { requireSignIn, isAdmin } = require("../middileware/authMiddileware");

const router = express.Router();

router.post('/register', registerController);

router.post('/login', loginController)

router.get('/test', requireSignIn, isAdmin, testController)

module.exports = router