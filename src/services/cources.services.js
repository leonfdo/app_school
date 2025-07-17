const { invalidId } = require("../error");
const Cources = require("../models/cources.model")
const User = require("../models/user.model")


const getCources = async ()=>{
    return await Cources.find().populate("teacher").populate("students");
}

const getCource = async (cource_id)=>{
    const cource_data = await Cources.findById(cource_id).populate("teacher").populate("students")
    if(!cource_data){
        throw new invalidId("No cource with this ID")
    }

    return cource_data
}

const updateCourceName = async (cource_id,req_body)=>{
    const cource_data = await Cources.findByIdAndUpdate(cource_id,req_body)
    if(!cource_data){
        throw new invalidId("No cource with this ID")
    }
    return cource_data
}

const createCources = async (req_body)=>{
    return await Cources.create(req_body)
}

const deleteCources = async (cource_id)=>{
        const cource_data = await Cources.findById(cource_id)
        if(!cource_data){
            throw new invalidId("No cource with this ID")
        }
        const delete_cource = await Cources.findByIdAndDelete(cource_id)
        await User.updateMany({"cources._id" : cource_id},{$pull:{cources : cource_id }})
}


module.exports ={
    getCources,
    getCource,
    updateCourceName,
    createCources,
    deleteCources
}