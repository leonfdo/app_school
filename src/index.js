require("dotenv").config()
const express = require('express')
const mongoose = require('mongoose')
const User = require("./models/user.model")
const Cources = require("./models/cources.model")
const userRoute = require("./routes/user.route")
const teacherRoute = require("./routes/teacher.route")
const courcesRoute = require("./routes/cources.route")




const app = express()

//middle
app.use(express.json())


//routing
app.use("/api/user",userRoute)
app.use("/api/teacher",teacherRoute)
app.use("/api/cources",courcesRoute)



//general test
app.get("/",(req,resp)=>{
    resp.send("server is running")
})



//connection establishment

module.exports = app