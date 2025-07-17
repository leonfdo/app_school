const mongoose = require("mongoose")

const TeacherSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true,"name is required"]
    },
    email : {
         type : String,
         required : [true, "email is required"],
         unique : true
     }
})

module.exports = mongoose.model("Teacher",TeacherSchema)