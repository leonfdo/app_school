const {MongoMemoryServer} = require("mongodb-memory-server")
const mongoose = require("mongoose")

let mongo;

beforeAll(async()=>{
    mongo = await MongoMemoryServer.create();
    const URI = mongo.getUri();

    await mongoose.connect(URI)
    console.log(`connected to ${URI}`)

})


afterAll(async()=>{
    const URI = mongo.getUri();
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongo.stop()
    console.log(`connection to ${URI} closed`)
})

afterEach (async ()=>{
 const collections = mongoose.connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany();
  }
})