const express = require("express")
const router = express.Router()
const {getCources,getCource,createCources,updateCourceName,deleteCources} = require("../controller/cources.controller")
const {bodyLenValidation,idValidation,courceValidation,bodyValidation,validate}=require("../utils/validation")



router.get("/",bodyLenValidation(0,""),validate,getCources) //checked

router.get("/:id",[bodyLenValidation(0,""),idValidation],validate,getCource); //checked

router.post("/",[bodyValidation[0],bodyLenValidation(1,"name")],validate,createCources); //checked

router.put("/:id",[idValidation,bodyValidation[0],bodyLenValidation(1,"name")],validate,updateCourceName); //checked

router.delete("/:id",[bodyLenValidation(0,""),idValidation],validate,deleteCources); //checked (need to check with students)


module.exports = router
