const { body } = require("express-validator");

const validators = {};
const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,32})/

validators.registerValidator = [
  body("username")
    .notEmpty().withMessage("Is required")
    .isLength({ min: 4, max: 32 }).withMessage("Format incorrect"),
  body("email")
    .notEmpty().withMessage("Is required")
    .isEmail().withMessage("Format incorrect"),
  body("password")
    .notEmpty().withMessage("Is required")
    .matches(passwordRegexp).withMessage("Format incorrect"),
  body("name")
    .notEmpty().withMessage("Is required"),
  body("team")
    .optional()
    .notEmpty().withMessage("Is required")
    .isObject().withMessage("Must be an object"),
  body("team.number")
    .notEmpty().withMessage("Is required")
    .isInt({ min: 0 }).withMessage("Must be an integer")
    .toInt(),
  body("team.section")
    .notEmpty().withMessage("Is required")
    .isInt({ min: 0, max: 2 }).withMessage("Must be an integer")
    .toInt(),
];

module.exports = validators;