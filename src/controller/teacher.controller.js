const TeacherServices = require("../services/teacher.services.js")
const { invalidId } = require("../error.js");
const mongoose = require("mongoose")
const logger = require("../logger.js")


const getTeachers = async (req,resp) =>{
    try{
        const teachers = await TeacherServices.getTeachers()
        return resp.status(200).json(teachers)
    }catch(err){
            logger.error(err.message)
            return resp.status(500).json("internal server error")
    }
}


//need testing
const createTeacher = async (req,resp)=>{
    try{
        const {name,email} = req.body

        const req_body = {
            "name":name,
            "email":email
        }

        const teacher_detail = await TeacherServices.createTeacher(req_body)
        return resp.status(200).json(teacher_detail)


    }catch(err){
            logger.error(err.message)

            if(err.code===11000){
                return resp.status(404).json("duplicate teacher email")
            }


            return resp.status(500).json("internal server error")
    }
}


//need test (test if cources teacher is removed)
const deleteTeacher = async (req,resp)=>{
    try{
        const teacher_id = req.params.id;

        const teacher = await TeacherServices.deleteTeacher(teacher_id)

        return resp.status(200).json("succefully Deleted")
    }catch(err){
        logger.error(err.message)
        if(err instanceof invalidId){
            return resp.status(404).json(err.message)
        }
        return resp.status(500).json("internal server error")
    }
}


//check thsi for working
const updateTeacher = async (req,resp)=>{
    try{
        const teacher_id = req.params.id;

        const {name,email} = req.body

        const req_body = {
            "name":name,
            "email":email
        }

        const update_teacher = await TeacherServices.updateTeacher(teacher_id,req_body)

        return resp.status(200).json("succefully updated")

    }catch(err){
        logger.error(err.message)
        if(err instanceof invalidId){
            return resp.status(404).json(err.message)
        }

        if(err.code===11000){
            return resp.status(404).json("duplicate teacher email")
        }

        return resp.status(500).json("internal server error")
    }
}

const getTeacher = async (req,resp)=>{
    try{
        const teacher_id = req.params.id
        const teacher_data = await TeacherServices.getTeacher(teacher_id)
        return resp.status(200).json(teacher_data)

    }catch(err){
        logger.error(err.message)
        if(err instanceof invalidId){
            return resp.status(404).json(err.message)
        }
        return resp.status(500).json("internal server error")
    }
}

const getTeacherCources = async (req,resp)=>{
    try{
        const teacher_id = req.params.id

        const cource_data = await TeacherServices.getTeacherCources(teacher_id)

        return resp.status(200).json(cource_data)

    }catch(err){
        logger.error(err.message)
        if(err instanceof invalidId){
            return resp.status(404).json(err.message)
        }
        return resp.status(500).json("internal server error")
    }
}


const setTeacherCources = async (req,resp)=>{
    try{
            const teacher_id = req.params.id

            const cource_id = req.body.cource

            await TeacherServices.setTeacherCources(teacher_id,cource_id)
            return resp.status(200).json("succefully updated")
    
        }catch(err){
            logger.error(err.message)
            if(err instanceof invalidId){
            return resp.status(404).json(err.message)
        }

            return resp.status(500).json("internal server error")
        }
}

const removeTeacherCource = async(req,resp)=>{
    try{
        const teacher_id = req.params.id;

        const cource_id = req.body.cource;

        await TeacherServices.removeTeacherCource(teacher_id,cource_id)

        return resp.status(200).json("succefully removed")

    }catch(err){
        logger.error(err.message)
        if(err instanceof invalidId){
                return resp.status(404).json(err.message)
            }
        return resp.status(500).json("internal server error")
    }
}

module.exports = {
    getTeachers,
    getTeacher,
    createTeacher,
    deleteTeacher,
    updateTeacher,
    getTeacherCources,
    setTeacherCources,
    removeTeacherCource
}