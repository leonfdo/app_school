const request = require("supertest")
const app = require("../../index")
const Cources = require("../../models/cources.model")
const mongoose = require("mongoose")



require("../setupDB")

describe("GET /api/couces",()=>{
    it("should return a set of cources",async ()=>{

        await Cources.create({
            "name" : "maths"
        })

        await Cources.create({
            "name" : "pure"
        })


        const response = await request(app).get("/api/cources");
        expect(response.status).toBe(200);
        expect(response.body).not.toBe([])

        expect(response.body.find((ele)=>{
            return ele.name === "maths"
        })._id).not.toBeNull()

        expect(response.body.length).toBe(2)
    })

    it("should return courses with expected fields", async () => {
            await Cources.create({ name: "science" });

            const response = await request(app).get("/api/cources");

            expect(response.status).toBe(200);
            expect(response.body[0]).toHaveProperty("_id");
            expect(response.body[0]).toHaveProperty("__v");
            expect(response.body[0]).toHaveProperty("name", "science");
            expect(response.body[0]).toHaveProperty("students",[]);
            expect(response.body[0]).not.toHaveProperty("teacher")
            expect(Object.keys(response.body[0]).length).toBe(4)
    });

    it("should return an empty array if no cources exist", async () => {
        const response = await request(app).get("/api/cources");

        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });


    it("should return an error when body is given with the api call", async () => {

        const response = await request(app).get("/api/cources").send({ name: "leon" });

        expect(response.status).toBe(400);
        expect(response.body).toEqual("body should contain only 0 keys ");
    });




})

describe ("POST /api/cources",()=>{
    it("should create a cources",async ()=>{
        const response = await request(app).post("/api/cources").send({name:"maths"});
        //console.log(response.body)
        expect(response.status).toBe(200)
        //console.log(response.body)
        expect(response.body).toHaveProperty("_id");
        expect(response.body).toHaveProperty("__v");
        expect(response.body).toHaveProperty("name", "maths");
        expect(response.body).toHaveProperty("students",[]);
        expect(response.body).not.toHaveProperty("teacher")
        expect(Object.keys(response.body).length).toBe(4)

        
    })

    it("should return an 400 error when name is not given", async()=>{

        const response1= await request(app).post("/api/cources").send({name:""});
        expect(response1.status).toBe(400)
        expect(response1.body).toEqual("Name is required")

    })


    it("should return an 400 error when additional body keys are given", async()=>{

        const response1= await request(app).post("/api/cources").send({name:"csds", age:"2"});
        expect(response1.status).toBe(400)
        expect(response1.body).toEqual("body should contain only 1 keys name")

    })
})



describe("GET /api/cources/:id",()=>{
    it("should return the cource related to that ID",async ()=>{

        await Cources.create({
            "name" : "maths"
        })

        await Cources.create({
            "name" : "pure"
        })

        const id = await Cources.find({name: "maths"},{_id:1}).then((ele)=> ele[0]._id.toString())
        //console.log(id)

        const response = await request(app).get(`/api/cources/${id}`);
        //console.log(response.message)
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("maths")

    })

    it("should return an error when wrong id is given",async ()=>{

        await Cources.create({
            "name" : "maths"
        })

        await Cources.create({
            "name" : "pure"
        })

        const id = await Cources.find({name: "maths"},{_id:1}).then((ele)=> ele[0]._id.toString())
        //console.log(id)

        const response = await request(app).get(`/api/cources/fejqkgeq`);
        expect(response.status).toBe(400);
        expect(response.body).toBe("correct ID required");


    })

    it("should return an error when no Cource with that ID",async ()=>{

       await Cources.create({
            "name" : "maths"
        })

        await Cources.create({
            "name" : "pure"
        })

        const id = await Cources.find({name: "maths"},{_id:1}).then((ele)=> ele[0]._id.toString())
        await Cources.findByIdAndDelete(id)
        //console.log(id)

        const response = await request(app).get(`/api/cources/${id}`);
        expect(response.status).toBe(404);
        expect(response.body).toBe("No cource with this ID")
        

    })

    it("should return an 400 error when additional body keys are given", async()=>{

        await Cources.create({
            "name" : "maths"
        })

        await Cources.create({
            "name" : "pure"
        })

        const id = await Cources.find({name: "maths"},{_id:1}).then((ele)=> ele[0]._id.toString())
        await Cources.findByIdAndDelete(id)

        const response = await request(app).get(`/api/cources/${id}`).send({"name":"leon"});
        expect(response.status).toBe(400)
        expect(response.body).toEqual("body should contain only 0 keys ")

    })

})



describe("UPDATE /api/cource/:id",()=>{
    it("should update the cource",async ()=>{

        await Cources.create({
            "name" : "maths"
        })

        const id = await Cources.find({name: "maths"},{_id:1}).then((ele)=> ele[0]._id.toString())


        const response = await request(app).put(`/api/cources/${id}`).send({name:"english"});;
        expect(response.status).toBe(200);

        const user = await Cources.findById(id)
        expect(user.name).toBe("english")


    })

    it("should return 404 if the course with the given ID does not exist", async () => {
        const nonExistentId = new mongoose.Types.ObjectId();

        const response = await request(app)
            .put(`/api/cources/${nonExistentId}`)
            .send({ name: "updated name" });

        expect(response.status).toBe(404);
        expect(response.body).toEqual("No cource with this ID");
    });

    it("should return 400 if the course ID is invalid", async () => {
    const invalidId = "12345";

    const response = await request(app)
        .put(`/api/cources/${invalidId}`)
        .send({ name: "updated name" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual("correct ID required");
    });


        it("should return 400 if request body is empty", async () => {
            const course = await Cources.create({ name: "biology" });

            const response = await request(app)
            .put(`/api/cources/${course._id}`)
            .send({}); // Empty body

        expect(response.status).toBe(400);
        expect(response.body).toEqual("body should contain only 1 keys name");
    });

    it("should return 400 if request body name is empty", async () => {
            const course = await Cources.create({ name: "biology" });

            const response = await request(app)
            .put(`/api/cources/${course._id}`)
            .send({"name":""}); 

        expect(response.status).toBe(400);
        expect(response.body).toEqual("Name is required");
    });

    it("should return an error when update the cource with a name already in list",async ()=>{

        await Cources.create({
            "name" : "maths"
        })

        await Cources.create({
            "name" : "english"
        })

        const id = await Cources.find({name: "maths"},{_id:1}).then((ele)=> ele[0]._id.toString())


        const response = await request(app).put(`/api/cources/${id}`).send({name:"english"});;
        expect(response.status).toBe(404);
        expect(response.body).toEqual("duplicate teacher email")
    })



})



describe("Delete /api/cources/:id",()=>{
    it("should Delete the cources",async ()=>{

        await Cources.create({
            "name" : "maths"
        })


        const id = await Cources.find({name: "maths"},{_id:1}).then((ele)=> ele[0]._id.toString())

        const response = await request(app).delete(`/api/cources/${id}`);

        //console.log(response.body)
        expect(response.status).toBe(200);
        expect(response.body).toBe("succefully Deleted");
        
        const user = await Cources.findById(id)
        expect(user).toBeNull();
        

    })

    it("should return 404 if the course does not exist", async () => {
        const nonExistentId = new mongoose.Types.ObjectId();

        const response = await request(app).delete(`/api/cources/${nonExistentId}`);

        expect(response.status).toBe(404);
        expect(response.body).toEqual("No cource with this ID");
    });


    it("should return 400 for invalid course ID", async () => {
        const response = await request(app).delete("/api/cources/invalid-id");

        expect(response.status).toBe(400);
        expect(response.body).toEqual("correct ID required");
    });




})


