const mongoose = require("mongoose")


const UserSchema = mongoose.Schema({
    name : {
        type : String,
        required : true , 
    },
     email : {
         type : String,
         required : true,
         unique : true
     },
     cources : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Cources"
     }]
})


module.exports = mongoose.model("User",UserSchema)