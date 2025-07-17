const mongoose = require("mongoose")

const CourcesSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
        
    },
    students : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"    
    }],
    teacher : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Teacher"
    }

})


module.exports = mongoose.model("Cources",CourcesSchema)