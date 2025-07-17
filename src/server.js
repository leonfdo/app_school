const app = require("./index")
const mongoose = require("mongoose")
require("dotenv").config()
const logger = require("./logger.js")
const config = require("config")

const url = config.get("db.url")
const port = config.get("server.port")


mongoose.connect(url)


.then(()=>{
    console.log("connected to the database")
    app.listen(port,()=>{
    console.log(`server is working on port : ${port}`)
    logger.info(`Server is running on http://localhost:${port}`);
})
}).catch((err)=>{
    console.log(err)
})