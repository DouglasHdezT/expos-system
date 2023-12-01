const { body, param } = require("express-validator");

const validators = {};

validators.idInParamsValidator = [
  param("identifier")
    .notEmpty().withMessage("Is required")
    .isMongoId().withMessage("Must be a mongo id")
];

validators.attendValidator = [
  body("attendants")
    .notEmpty().withMessage("Is Required")
    .isArray().withMessage("Must be an array"),
  body("attendants.*")
    .notEmpty().withMessage("Is Required")
    .isMongoId().withMessage("Must be a mongo id")
]

validators.saveValidator = [
  param("identifier")
    .optional()
    .notEmpty().withMessage("Is required")
    .isMongoId().withMessage("Must be a mongo id"),
  body("team")
    .notEmpty().withMessage("Is required")
    .isObject().withMessage("Must be an object"),
  body("team.name")
    .notEmpty().withMessage("Is required"),
  body("team.number")
    .notEmpty().withMessage("Is required")
    .isInt({ min: 1 }).withMessage("Must be an integer")
    .toInt(),
  body("team.section")
    .notEmpty().withMessage("Is required")
    .isInt({ min: 1, max: 2 }).withMessage("Must be an integer")
    .toInt(),
  body("project")
    .notEmpty().withMessage("Is required"),
  body("capacity")
    .optional()
    .notEmpty().withMessage("Is required")
    .isInt({ min: 1, max: 30 }).withMessage("Must be an integer")
    .toInt(),
  body("date")
    .notEmpty().withMessage("Is required")
    .isISO8601().withMessage("Must be a date in ISO8601")
]

module.exports = validators;