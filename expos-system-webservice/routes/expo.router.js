const express = require("express");
const router = express.Router();

const ROLES = require("../data/roles.constants.json");

const runValidation = require("../validators/index.middleware");
const expoController = require("../controllers/expo.controller");
const { idInParamsValidator, saveValidator, attendValidator } = require("../validators/expo.validators");
const { authentication, authorization } = require("../middlewares/auth.middlewares");

router.get("/", expoController.findAll);
router.get("/own", authentication, authorization(ROLES.USER), expoController.findOwn);
router.get("/stats", authentication, authorization(ROLES.SYSADMIN), expoController.getStats)
router.get("/:identifier", idInParamsValidator, runValidation, expoController.findById);

router.post("/sub/:identifier", authentication, authorization(ROLES.USER), idInParamsValidator, runValidation, expoController.toggleSub);
router.post("/attend/:identifier", authentication, authorization(ROLES.SCANNER), attendValidator, idInParamsValidator, runValidation, expoController.toggleSub);
router.post(["/", "/:identifier"], authentication, authorization(ROLES.ADMIN), saveValidator, runValidation, expoController.save);

router.delete("/:identifier", authentication, authorization(ROLES.ADMIN), idInParamsValidator, runValidation, expoController.delete);

module.exports = router;