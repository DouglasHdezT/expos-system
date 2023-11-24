const express = require("express");
const router = express.Router();

const runValidation = require("../validators/index.middleware");
const authController = require("../controllers/auth.controller");
const { registerValidator } = require("../validators/auth.validators");
const { authentication } = require("../middlewares/auth.middlewares");

router.post("/register",
  registerValidator,
  runValidation,
  authController.register
);

router.post("/login", 
  authController.login
);

router.get("/whoami", 
  authentication,
  authController.whoami
);

module.exports = router;
