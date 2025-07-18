
const { param,body, validationResult } = require('express-validator');
const logger = require("../logger")

const idValidation =[
    param("id").isMongoId().withMessage("correct ID required")
]

const courceValidation =[
    body("cource")
    .exists({ checkFalsy: true }).withMessage("Cource ID is required")
    .isMongoId().withMessage("correct cource ID required")
]

const bodyLenValidation = (num,...args)=>{
  return [
      (req,resp,next)=>{
          if(req.body && Object.keys(req.body).length!==num){
            return resp.status(400).json(`body should contain only ${num} keys ${args}`)
          }
          next()
      }
  ]
}



const bodyValidation = [
  body("name")
    .exists({ checkFalsy: true }).withMessage("Name is required")
    .isString().withMessage("Only strings are allowed")
    .isLength({ min: 3 }).withMessage("Name must be at least 3 characters long"),

  body("email")
    .exists({ checkFalsy: true }).withMessage("Email is required")
    .isEmail().withMessage("Incorrect email format")
];


const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
 
  const firstErrors = errors.array({ onlyFirstError: true });
  const msg = firstErrors[0].msg
  logger.error(msg)
  return res.status(400).json(msg);
}

module.exports={
    idValidation,
    bodyValidation,
    courceValidation,
    bodyLenValidation,
    validate
}