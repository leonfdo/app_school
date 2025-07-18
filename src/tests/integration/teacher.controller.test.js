const request = require("supertest")
const app = require("../../index")
const Teacher = require("../../models/teacher.model")
const mongoose = require("mongoose")
const Cource = require("../../models/cources.model")

require("../setupDB")

describe("GET /api/teacher",()=>{
    it("should return a set of teachers",async ()=>{

        await Teacher.create({
            "name" : "leon",
            "email": "leon@gmail"
        })

        const response = await request(app).get("/api/teacher");
        expect(response.status).toBe(200);
        expect(response.body).not.toBe([])
        expect(response.body.length).toBe(1)
        expect(response.body[0]).toHaveProperty("name", "leon");
        expect(response.body[0]).toHaveProperty("email", "leon@gmail");
        expect(response.body[0]).toHaveProperty("_id");
        expect(response.body[0]).toHaveProperty("__v");
        expect(Object.keys(response.body[0]).length).toBe(4)

    })

    it("should return an empty array if no teachers are in the database", async () => {
        const response = await request(app).get("/api/teacher");

        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });


    it("should return an error when body is given with the api call", async () => {
    
            const response = await request(app).get("/api/teacher").send({ name: "leon" });
    
            expect(response.status).toBe(400);
            expect(response.body).toEqual("body should contain only 0 keys ");
        });

})

describe ("POST /api/teacher",()=>{
    it("should create a teacher",async ()=>{
        const response = await request(app).post("/api/teacher").send({name:"leon",email:"leon@gmail.com"});

        expect(response.status).toBe(200)

        const user_detail = await Teacher.find({email: "leon@gmail.com"})

        //console.log(user_detail)

        expect(user_detail[0]._id).not.toBeNull()
        expect(user_detail[0].name).toBe("leon")
        expect(user_detail[0].email).toBe("leon@gmail.com")
        expect(response.body).toHaveProperty("_id");
        expect(response.body).toHaveProperty("__v");
        expect(Object.keys(response.body).length).toBe(4)
  
    })

    it("should return an error when email is not given", async()=>{

        const response1= await request(app).post("/api/teacher").send({name:"leon",email:""});
        expect(response1.status).toBe(400)
        expect(response1.body).toBe("Email is required")

    })

    it("should return an error when duplicate items given",async ()=>{
        const response1= await request(app).post("/api/teacher").send({name:"leon",email:"leon@gmail.com"});
        const response2= await request(app).post("/api/teacher").send({name:"leon",email:"leon@gmail.com"});

        expect(response2.status).toBe(404)
    })

    it("should return an 400 error when additional body keys are given", async()=>{

        const response1= await request(app).post("/api/teacher").send({name:"csds", email:"leon@gmail",age:"2"});
        expect(response1.status).toBe(400)
        expect(response1.body).toEqual("body should contain only 2 keys name,email")

    })



})



describe("GET /api/teacher/:id",()=>{
    it("should return the teacher relavant to that ID",async ()=>{

        await Teacher.create({
            "name" : "leon",
            "email": "leon@gmail"
        })

        await Teacher.create({
            "name" : "leon1",
            "email": "leon1@gmail"
        })

        const id = await Teacher.find({email: "leon@gmail"},{_id:1}).then((ele)=> ele[0]._id.toString())
        //console.log(id)

        const response = await request(app).get(`/api/teacher/${id}`);
        //console.log(response.message)
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("leon")
        expect(response.body.email).toBe("leon@gmail")

    })

    it("should return an error when wrong id is given",async ()=>{

        await Teacher.create({
            "name" : "leon",
            "email": "leon@gmail"
        })

        await Teacher.create({
            "name" : "leon1",
            "email": "leon1@gmail"
        })

        const response = await request(app).get(`/api/teacher/fejqkgeq`);
        //console.log(response.body)
        expect(response.status).toBe(400);
        expect(response.body).toBe("correct ID required");


    })

    it("should return an error when no Teacher with this ID",async ()=>{

        await Teacher.create({
            "name" : "leon",
            "email": "leon@gmail"
        })

        await Teacher.create({
            "name" : "leon1",
            "email": "leon1@gmail"
        })

        const id = await Teacher.find({email: "leon@gmail"},{_id:1}).then((ele)=> ele[0]._id.toString())
        await Teacher.findByIdAndDelete(id)
        //console.log(id)

        const response = await request(app).get(`/api/teacher/${id}`);
        expect(response.status).toBe(404);
        expect(response.body).toBe("no teacher with this ID")
        

    })


    it("should return an error when addditional body element is given",async ()=>{

        await Teacher.create({
            "name" : "leon",
            "email": "leon@gmail"
        })

        await Teacher.create({
            "name" : "leon1",
            "email": "leon1@gmail"
        })

        const id = await Teacher.find({email: "leon@gmail"},{_id:1}).then((ele)=> ele[0]._id.toString())
        //console.log(id)

        const response = await request(app).get(`/api/teacher/${id}`).send({name:"leon"});
        expect(response.status).toBe(400);
        expect(response.body).toEqual("body should contain only 0 keys ");
    })

})



describe("UPDATE /api/teacher/:id",()=>{
    it("should update the teacher",async ()=>{

        await Teacher.create({
            "name" : "leon",
            "email": "leon@gmail"
        })

        const id = await Teacher.find({email: "leon@gmail"},{_id:1}).then((ele)=> ele[0]._id.toString())


        const response = await request(app).put(`/api/teacher/${id}`).send({name:"leon_fdo",email:"leon@gmail.com"});;
        expect(response.status).toBe(200);

        const user = await Teacher.findById(id)
        expect(user.name).toBe("leon_fdo")
        expect(user.email).toBe("leon@gmail.com")


    })

    it("should return 404 if teacher does not exist", async () => {
        const nonExistentId = new mongoose.Types.ObjectId();

        const response = await request(app)
            .put(`/api/teacher/${nonExistentId}`)
            .send({ name: "new name" , email:"leon@gmail.com"});

        expect(response.status).toBe(404);
        expect(response.body).toEqual("no teacher with this ID");
    });

    it("should return 400 if ID format is invalid", async () => {
    const response = await request(app)
        .put("/api/teacher/invalid-id")
        .send({ name: "any",email:"leon@gmail" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual("correct ID required");
    });


    it("should return 400 if request body is empty", async () => {
    const teacher = await Teacher.create({ name: "test", email: "test@gmail.com" });

    const response = await request(app)
        .put(`/api/teacher/${teacher._id}`)
        .send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual("body should contain only 2 keys name,email");
    });






})



describe("Delete /api/teacher/:id",()=>{
    it("should Delete the Teacher",async ()=>{

        await Teacher.create({
            "name" : "leon",
            "email": "leon@gmail"
        })


        const id = await Teacher.find({email: "leon@gmail"},{_id:1}).then((ele)=> ele[0]._id.toString())

        const response = await request(app).delete(`/api/teacher/${id}`);


        expect(response.status).toBe(200);
        expect(response.body).toBe("succefully Deleted");
        
        const user = await Teacher.findById(id)
        expect(user).toBeNull();
        

    })


    it("should return 404 if the teacher does not exist", async () => {
    const nonExistentId = new mongoose.Types.ObjectId();

    const response = await request(app).delete(`/api/teacher/${nonExistentId}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual("no teacher with this ID");
    });


    it("should return 400 for an invalid ObjectId", async () => {
    const response = await request(app).delete(`/api/teacher/12345`);

    expect(response.status).toBe(400);
    expect(response.body).toEqual("correct ID required");
    });
})


describe("post /api/teacher/join/:id",()=>{
    it("should join the cource",async()=>{
        const created_teacher = await Teacher.create({
            "name" : "leon",
            "email": "leon@gmail"
        })

        const created_cource = await Cource.create({
            "name":"maths"
        })

        const response = await request(app).put(`/api/teacher/join/${created_teacher._id}`).send({cource:created_cource.id});

        expect(response.status).toBe(200)
        expect(response.body).toEqual("succefully updated")


    })
})