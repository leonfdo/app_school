const { model, default: mongoose } = require("mongoose")
const CourceServices = require("../services/cources.services.js")
const { invalidId } = require("../error.js")
const logger = require("../logger.js")


const getCources = async (req,resp) =>{
    try{
        const cources = await CourceServices.getCources()
        return resp.status(200).json(cources)
    }catch(err){
        logger.error(err.message)
        return resp.status(500).json("internal server error")
    }
}


const getCource = async (req,resp)=>{
    try{
        const cource_id = req.params.id
        let cource_data
        cource_data = await CourceServices.getCource(cource_id)
        return resp.status(200).json(cource_data)

    }catch(err){
        logger.error(err.message)
        if(err instanceof invalidId){
            return resp.status(404).json(err.message)
        }
        
        return resp.status(500).json("internal server error")
    }
}



const updateCourceName = async (req,resp)=>{
    try{
        const cource_id = req.params.id;
        const new_cource_name = req.body.name 

        const req_body = {
            "name" : new_cource_name
        }

        await CourceServices.updateCourceName(cource_id,req_body)
        return resp.status(200).json("succefully updated")

    }catch(err){
        logger.error(err.message)
        if(err instanceof invalidId){
            return resp.status(404).json(err.message)
        }

            return resp.status(500).json("internal server error")
    }
}



const createCources = async (req,resp)=>{
    try{
        
        const new_cource_name = req.body.name 
        
        const req_body = {
            "name" : new_cource_name
        }  

        const cource_detail = await CourceServices.createCources(req_body)
        return resp.status(200).json(cource_detail)

    }catch(err){
        logger.error(err.message)
        return resp.status(500).json("internal server error")}

}



const deleteCources = async (req,resp)=>{
    try{
        const cource_id = req.params.id;
        const cource_data = await CourceServices.deleteCources(cource_id)
        return resp.status(200).json("succefully Deleted")

        
    }catch(err){
        logger.error(err.message)
        if(err instanceof invalidId){
            return resp.status(404).json(err.message)
        }
        return resp.status(500).json("internal server error")
    }
}



module.exports ={
    getCources,
    getCource,
    updateCourceName,
    createCources,
    deleteCources
}