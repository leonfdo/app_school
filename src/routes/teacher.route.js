const express = require("express")
const router = express.Router()
const {getTeachers,getTeacher,createTeacher,updateTeacher,deleteTeacher,getTeacherCources, setTeacherCources,removeTeacherCource} = require("../controller/teacher.controller")
const {idValidation,courceValidation,bodyValidation,validate}=require("../utils/validation")




router.get("/",getTeachers) //checked

router.get("/:id",idValidation,validate,getTeacher); //checked

router.post("/",bodyValidation,validate,createTeacher); //checked

router.put("/:id",[idValidation,bodyValidation],validate,updateTeacher); //checked

router.delete("/:id",idValidation,validate,deleteTeacher); //checked

router.get("/cources/:id",idValidation,validate,getTeacherCources) //checked

router.put("/join/:id",[idValidation,courceValidation],validate,setTeacherCources) // checked

router.put("/remove/:id",[idValidation,courceValidation],validate,removeTeacherCource) //checked




module.exports = router