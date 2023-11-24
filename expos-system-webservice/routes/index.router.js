const express = require("express");
const router = express.Router();

const expoRouter = require("./expo.router");
const authRouter = require("./auth.router");

router.use("/auth", authRouter);
router.use("/expo", expoRouter);


module.exports = router;