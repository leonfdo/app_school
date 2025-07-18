const UserServices = require("../services/user.services.js")
const { invalidId } = require("../error.js");
const mongoose = require("mongoose")
const logger = require("../logger.js")


const getUsers = async (req,resp)=>{
    try{
            const users = await UserServices.getUsers()
            logger.info("getUsers API hit")
            return resp.status(200).json(users)
        }catch(err){
            logger.error(err.message)
            return resp.status(500).json("internal server error")
        }
}


const createUser = async (req,resp)=>{
    try{    
            const {name,email} = req.body

            const req_body = {
                "name":name,
                "email":email
            }

            const product = await UserServices.createUser(req_body)
            logger.info("createUser API hit")
            return resp.status(200).json(product)
        }catch(err){
            logger.error(err.message)
            if(err.code===11000){
                return resp.status(404).json("duplicate user email")
            }
            return resp.status(500).json("internal server error")
        }
}

const updateUser = async (req,resp)=>{
    try{
        const user_id = req.params.id;

        const {name,email} = req.body

            const req_body = {
                "name":name,
                "email":email
            }


        await UserServices.updateUser(user_id,req_body)
        logger.info("updateUser API hit")
        return resp.status(200).json("succefully updated")
    }catch(err){
        logger.error(err.message)
        if(err instanceof invalidId){
            return resp.status(404).json(err.message)
        }
        
        if(err.code===11000){
                return resp.status(404).json("duplicate user email")
        }

        return resp.send(500).json("internal server error")
        
    }
}


//test this (need to delete from every cource)
const deleteUser = async (req,resp)=>{
    try{
        const user_id = req.params.id;
        await UserServices.deleteUser(user_id)
        logger.info("deleteUser API hit")
        return resp.status(200).json("succefully Deleted")
    }catch(err){
        logger.error(err.message)
        if(err instanceof invalidId){
            return resp.status(404).json(err.message)
        }
            resp.send(500).json("internal server error")
        
    }
}

const getUser = async (req,resp)=>{
    try{
        const user_id = req.params.id
        const user_data = await UserServices.getUser(user_id)
        logger.info("getUser API hit")
        return resp.status(200).json(user_data)
    }catch(err){
        logger.error(err.message)
        if(err instanceof invalidId){
           return  resp.status(404).json(err.message)
        }
        return resp.status(500).json("internal server error")
    }
}


const joinUserCource = async(req,resp)=>{
    try{
        const user_id = req.params.id

        const cource_id = req.body.cource
        await UserServices.joinUserCource(user_id,cource_id)
        logger.info("joinUserCource API hit")
        return resp.status(200).json("succefully updated")

    }catch(err){
        logger.error(err.message)
        return resp.status(500).json("internal server error")
    }
}


const removeUserCource = async(req,resp)=>{
    try{
        const user_id = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(user_id)){
            logger.error("Invalid ID")
            return resp.status(404).json("Invalid ID")
        }


        const cource_id = req.params.cource;
        await UserServices.removeUserCource(user_id,cource_id)
        logger.info("removeUserCources API hit")
        return resp.status(200).json("succefully removed")

    }catch(err){
        logger.error(err.message)
        return resp.status(500).json("internal server error")
    }
}


const getUserCources = async (req,resp)=>{
    try{
        const user_id = req.params.id
        const user_data = await UserServices.getUserCources(user_id)
        logger.info("getUserCources API hit")
        return resp.status(200).json(user_data)


    }catch(err){
        logger.error(err.message)
        if(err instanceof invalidId){
            return resp.status(404).json(err.message)
        }
        return resp.status(500).json("internal server error")
    }
}






module.exports = {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    createUser,
    joinUserCource,
    removeUserCource,
    getUserCources
}