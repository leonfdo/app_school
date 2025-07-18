const request = require("supertest")
const app = require("../../index")
const User = require("../../models/user.model")
const Cources = require("../../models/cources.model")
const mongoose = require("mongoose")
const Cource = require("../../models/cources.model")



require("../setupDB")

describe("GET /api/user",()=>{
    it("should return a set of users",async ()=>{

        await User.create({
            "name" : "leon",
            "email": "leon@gmail"
        })

        await User.create({
            "name" : "leon1",
            "email": "leon1@gmail"
        })

        const response = await request(app).get("/api/user");
        expect(response.status).toBe(200);
        expect(response.body).not.toBe([])
        expect(response.body.length).toBe(2)
        expect(response.body[0]).toHaveProperty("name", "leon");
        expect(response.body[0]).toHaveProperty("email", "leon@gmail");
        expect(response.body[0]).toHaveProperty("_id");
        expect(response.body[0]).toHaveProperty("__v");
        expect(response.body[0]).toHaveProperty("cources",[]);
        expect(Object.keys(response.body[0]).length).toBe(5)

    })

    it("should return an empty array if there are no users", async () => {
    const response = await request(app).get("/api/user");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
    });


    it("should return an error when body is given with the api call", async () => {
    
            const response = await request(app).get("/api/user").send({ name: "leon" });
    
            expect(response.status).toBe(400);
            expect(response.body).toEqual("body should contain only 0 keys ");
        });

})

describe ("POST /api/user",()=>{
    it("should create a user",async ()=>{
        const response = await request(app).post("/api/user").send({name:"leon",email:"leon@gmail.com"});

        expect(response.status).toBe(200)

        const user_detail = await User.find({email: "leon@gmail.com"})

        //console.log(user_detail)

        expect(user_detail[0]._id).not.toBeNull()
        expect(user_detail[0].name).toBe("leon")
        expect(user_detail[0].email).toBe("leon@gmail.com")
        
    })

    it("should return an error when email is not given", async()=>{

        const response1= await request(app).post("/api/user").send({name:"leon",email:""});
        expect(response1.status).toBe(400)
        expect(response1.body).toBe("Email is required")

    })

    it("should return 409 if email already exists", async () => {
    await User.create({ name: "leon", email: "leon@gmail.com" });

    const response = await request(app)
        .post("/api/user")
        .send({ name: "duplicate", email: "leon@gmail.com" });

    expect(response.status).toBe(404); // or 400 depending on how you handle it
    expect(response.body).toEqual("duplicate user email");
    });


    it("should return 400 for invalid email format", async () => {
    const response = await request(app)
        .post("/api/user")
        .send({ name: "leon", email: "invalid-email" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual("Incorrect email format");
    });


    it("should return an error when email is not given", async()=>{

        const response1= await request(app).post("/api/user").send({name:"leon",email:"leon@gmail",code:"advw"});
        expect(response1.status).toBe(400)
        expect(response1.body).toBe("body should contain only 2 keys name,email")

    })



})



describe("GET /api/user/:id",()=>{
    it("should return the id user",async ()=>{

        await User.create({
            "name" : "leon",
            "email": "leon@gmail"
        })

        await User.create({
            "name" : "leon1",
            "email": "leon1@gmail"
        })

        const id = await User.find({email: "leon@gmail"},{_id:1}).then((ele)=> ele[0]._id.toString())
        //console.log(id)

        const response = await request(app).get(`/api/user/${id}`);
        //console.log(response.message)
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("leon")
        expect(response.body.email).toBe("leon@gmail")
        expect(response.body).toHaveProperty("_id");
        expect(response.body).toHaveProperty("__v");
        expect(response.body).toHaveProperty("cources");
        expect(Object.keys(response.body).length).toBe(5)

    })

    it("sholud return an error when wrong id is given",async ()=>{

        await User.create({
            "name" : "leon",
            "email": "leon@gmail"
        })

        await User.create({
            "name" : "leon1",
            "email": "leon1@gmail"
        })

        const id = await User.find({email: "leon@gmail"},{_id:1}).then((ele)=> ele[0]._id.toString())
        //console.log(id)

        const response = await request(app).get(`/api/user/fejqkgeq`);
        //console.log(response.body)
        expect(response.status).toBe(400);
        expect(response.body).toBe("correct ID required");


    })

    it("should return an error when no user with this ID",async ()=>{

        await User.create({
            "name" : "leon",
            "email": "leon@gmail"
        })

        await User.create({
            "name" : "leon1",
            "email": "leon1@gmail"
        })

        const id = await User.find({email: "leon@gmail"},{_id:1}).then((ele)=> ele[0]._id.toString())
        await User.findByIdAndDelete(id)
        //console.log(id)

        const response = await request(app).get(`/api/user/${id}`);
        expect(response.status).toBe(404);
        expect(response.body).toBe("no user with this ID")
        

    })

})



describe("UPDATE /api/user/:id",()=>{
    it("should update the user",async ()=>{

        await User.create({
            "name" : "leon",
            "email": "leon@gmail"
        })

        const id = await User.find({email: "leon@gmail"},{_id:1}).then((ele)=> ele[0]._id.toString())


        const response = await request(app).put(`/api/user/${id}`).send({name:"leon_fdo",email:"leon@gmail.com"});;
        expect(response.status).toBe(200);

        const user = await User.findById(id)
        expect(user.name).toBe("leon_fdo")
        expect(user.email).toBe("leon@gmail.com")
        expect(user).toHaveProperty("_id");
        expect(user).toHaveProperty("__v");
        expect(user).toHaveProperty("cources");


    })


    it("should return 404 if user does not exist", async () => {
    const fakeId = new mongoose.Types.ObjectId();

    const response = await request(app)
        .put(`/api/user/${fakeId}`)
        .send({ name: "ghost" ,email:"leon@gmail.com"});

    expect(response.status).toBe(404);
    expect(response.body).toEqual("no teacher with this ID");
    });

    it("should return 400 if no update data is provided", async () => {
    const user = await User.create({ name: "john", email: "john@gmail.com" });

    const response = await request(app)
        .put(`/api/user/${user._id}`)
        .send({name:"leon"});

    expect(response.status).toBe(400);
    expect(response.body).toEqual("body should contain only 2 keys name,email");
    });



})



describe("Delete /api/user/:id",()=>{
    it("should Delete the user",async ()=>{

        await User.create({
            "name" : "leon",
            "email": "leon@gmail"
        })


        const id = await User.find({email: "leon@gmail"},{_id:1}).then((ele)=> ele[0]._id.toString())

        const response = await request(app).delete(`/api/user/${id}`);


        expect(response.status).toBe(200);
        expect(response.body).toBe("succefully Deleted");
        
        const user = await User.findById(id)
        expect(user).toBeNull();
        

    })
})


describe("post /api/user/join/:id",()=>{
    it("should join the cource",async()=>{
        const created_user = await User.create({
            "name" : "leon",
            "email": "leon@gmail.com"
        })

         const created_cource = await Cource.create({
             "name":"maths"
         })

         const response = await request(app).put(`/api/user/join/${created_user._id}`).send({cource:created_cource.id});

         expect(response.status).toBe(200)
         expect(response.body).toEqual("succefully updated")


    })
})

