const express = require("express")
const router = express.Router()
const {getUsers,getUser,createUser,updateUser,deleteUser,joinUserCource,removeUserCource,getUserCources} = require("../controller/user.controller")
const {bodyLenValidation,idValidation,courceValidation,bodyValidation,validate}=require("../utils/validation")


router.get("/",bodyLenValidation(0,""),validate,getUsers); //checked

router.get("/:id",[bodyLenValidation(0,""),idValidation],validate,getUser); //checked

router.post("/",[bodyValidation,bodyLenValidation(2,"name","email")],validate,createUser); //checked

router.put("/:id",[idValidation,bodyValidation],bodyLenValidation(2,"name","email"),validate,updateUser); //checked

router.put("/join/:id",[idValidation,courceValidation,bodyLenValidation(1,"cource")],validate,joinUserCource) //checked

router.put("/remove/:id",[idValidation,courceValidation,bodyLenValidation(1,"cource")],validate,removeUserCource) //checked

router.get("/cources/:id",[bodyLenValidation(0,""),idValidation],validate,getUserCources) //checked

router.delete("/:id",[bodyLenValidation(0,""),idValidation],validate,deleteUser); //checked 

module.exports = router;