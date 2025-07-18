const express = require("express")
const router = express.Router()
const {getTeachers,getTeacher,createTeacher,updateTeacher,deleteTeacher,getTeacherCources, setTeacherCources,removeTeacherCource} = require("../controller/teacher.controller")
const {bodyLenValidation,idValidation,courceValidation,bodyValidation,validate}=require("../utils/validation")


router.get("/",bodyLenValidation(0,""),validate,getTeachers) //checked

router.get("/:id",[bodyLenValidation(0,""),idValidation],validate,getTeacher); //checked

router.post("/",[bodyValidation,bodyLenValidation(2,"name","email")],validate,createTeacher); //checked

router.put("/:id",[idValidation,bodyValidation,bodyLenValidation(2,"name","email")],validate,updateTeacher); //checked

router.delete("/:id",[bodyLenValidation(0,""),idValidation],validate,deleteTeacher); //checked

router.get("/cources/:id",[bodyLenValidation(0,""),idValidation],validate,getTeacherCources) //checked

router.put("/join/:id",[idValidation,courceValidation,bodyLenValidation(1,"cource")],validate,setTeacherCources) // checked

router.put("/remove/:id",[idValidation,courceValidation,bodyLenValidation(1,"cource")],validate,removeTeacherCource) //checked




module.exports = router