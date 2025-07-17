const express = require("express")
const router = express.Router()
const {getCources,getCource,createCources,updateCourceName,deleteCources} = require("../controller/cources.controller")
const {idValidation,courceValidation,bodyValidation,validate}=require("../utils/validation")



router.get("/",getCources) //checked

router.get("/:id",idValidation,validate,getCource); //checked

router.post("/",bodyValidation[0],validate,createCources); //checked

router.put("/:id",[idValidation,bodyValidation[0]],validate,updateCourceName); //checked

router.delete("/:id",idValidation,validate,deleteCources); //checked (need to check with students)


module.exports = router
