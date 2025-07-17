const User = require("../models/user.model")
const Cources = require("../models/cources.model")
const {invalidId} = require('../error')

const getUsers = async ()=>{
    return await User.find().populate("cources")
}


const createUser = async (req_body)=>{
    return await User.create(req_body);
}


const updateUser = async (user_id,req_body)=>{
    const user_data = await User.findByIdAndUpdate(user_id,req_body)

    if(!user_data){ 
        throw new invalidId("no teacher with this ID")
    }

    return user_data

}


const deleteUser = async (user_id)=>{
    const user_data = await User.findById(user_id)
    if(!user_data){
        throw new invalidId("no User with this ID")
    }
    const delete_user = await User.findByIdAndDelete(user_id)
    await Cources.updateMany({user_id},{$pull:{students:user_id}})
}

const getUserCources = async (user_id)=>{
    const user_data =  await User.findById(user_id,{_id:0,cources:1}).populate("cources")

    if(!user_data){
        throw new invalidId("no teacher with this ID")
    }
    const cource_name = user_data.cources.map((ele)=>ele.name)

    return cource_name

}

const removeUserCource = async (user_id,cource_id)=>{
    const user_data = await User.findByIdAndUpdate(user_id,{$pull:{cources : cource_id}})
    const cource_data = await Cources.findByIdAndUpdate(cource_id,{$pull:{students:user_id}})
}

const joinUserCource = async(user_id,cource_id)=>{
    const user_data = await User.findByIdAndUpdate(user_id,{$addToSet:{cources : cource_id}})
    const cource_data = await Cources.findByIdAndUpdate(cource_id,{$addToSet:{students:user_id}})
}

const getUser = async (user_id)=>{
    const user_data = await User.findById(user_id).populate("cources")

    if(!user_data){
        throw new invalidId("no user with this ID")
    }

    return user_data
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