const express = require("express")
const router = express.Router()
const {getUsers,getUser,createUser,updateUser,deleteUser,joinUserCource,removeUserCource,getUserCources} = require("../controller/user.controller")
const {idValidation,courceValidation,bodyValidation,validate}=require("../utils/validation")


router.get("/",getUsers); //checked

router.get("/:id",idValidation,validate,getUser); //checked

router.post("/",bodyValidation,validate,createUser); //checked

router.put("/:id",[idValidation,bodyValidation],validate,updateUser); //checked

router.put("/join/:id",[idValidation,courceValidation],validate,joinUserCource) //checked

router.put("/remove/:id",[idValidation,courceValidation],validate,removeUserCource) //checked

router.get("/cources/:id",idValidation,validate,getUserCources) //checked

router.delete("/:id",idValidation,validate,deleteUser); //checked 

module.exports = router;