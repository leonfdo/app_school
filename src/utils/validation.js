
const { param,body, validationResult } = require('express-validator');


const idValidation =[
    param("id").isMongoId().withMessage("correct ID required")
]

const courceValidation =[
    body("cource")
    .notEmpty().withMessage("Cource Id required for join/delete")
    .isMongoId().withMessage("correct cource ID required")
]

const bodyValidation = [
  body("name")
    .notEmpty().withMessage("Name is required")
    .isString().withMessage("Only strings are allowed")
    .isLength({ min: 3 }).withMessage("Name must be at least 3 characters long"),

  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Incorrect email format")
];


const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
 
  const firstErrors = errors.array({ onlyFirstError: true });
  const msg = firstErrors[0].msg
  return res.status(400).json(msg);
}

module.exports={
    idValidation,
    bodyValidation,
    courceValidation,
    validate
}