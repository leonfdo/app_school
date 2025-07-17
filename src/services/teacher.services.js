const Teacher = require("../models/teacher.model")
const Cources = require("../models/cources.model")
const { invalidId } = require("../error");

const getTeachers = async ()=>{
    return await Teacher.find()
}

const createTeacher = async (req_body)=>{
    return await Teacher.create(req_body)
}

const deleteTeacher = async (teacher_id)=>{
    const teacher_data = await Teacher.findById(teacher_id)
    if(!teacher_data){
        throw new invalidId("no teacher with this ID")
    }
    const delete_teacher = await Teacher.findByIdAndDelete(teacher_id)  
    await Cources.updateMany({"teacher":teacher_id},{$unset:{teacher : teacher_id}})
    return delete_teacher
}


const getTeacher = async (teacher_id)=>{
    const teacher_data =  await Teacher.findById(teacher_id)

    if(!teacher_data){
        throw new invalidId("no teacher with this ID")
    }

    return teacher_data

}

const updateTeacher = async (teacher_id,req_body)=>{
    const teacher_data = await Teacher.findByIdAndUpdate(teacher_id,req_body)

    if(!teacher_data){
        throw new invalidId("no teacher with this ID")
    }

    return teacher_data
}

const getTeacherCources = async (teacher_id)=>{
    const teacher_data = await Cources.find({teacher:teacher_id},{name:1,_id:0})

    if(!teacher_data){
        throw new invalidId("no teacher with this ID")
    }

    return teacher_data
}

const setTeacherCources = async (teacher_id,cource_id)=>{

    const teacher_data = await Teacher.findById(teacher_id)
    if(!teacher_data){
        throw new invalidId("no teacher with this ID")
    }
    const cource_data = await Cources.findByIdAndUpdate(cource_id,{teacher:teacher_id})

    if(!cource_data){
        throw new invalidId("no cource with this ID")
    }

}


const removeTeacherCource = async (teacher_id,cource_id)=>{
    const teacher_data = await Teacher.findById(teacher_id)

    if(!teacher_data){
        throw new invalidId("no teacher with this ID")
    }

    const cource_data = await Cources.findByIdAndUpdate(cource_id,{$unset:{teacher:teacher_id}})

    if(!cource_data){
        throw new invalidId("no cource with this ID")
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