const request = require("supertest")
const app = require("../../index")
const Teacher = require("../../models/teacher.model")



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

    })

})

describe ("POST /api/teacher",()=>{
    it("should create a teacher",async ()=>{
        const response = await request(app).post("/api/teacher").send({name:"leon",email:"leon@gmail.com"});

        expect(response.status).toBe(200)

        const user_detail = await Teacher.find({email: "leon@gmail.com"})

        console.log(user_detail)

        expect(user_detail[0]._id).not.toBeNull()
        expect(user_detail[0].name).toBe("leon")
        expect(user_detail[0].email).toBe("leon@gmail.com")
        
    })

    it("when email is not given", async()=>{

        const response1= await request(app).post("/api/teacher").send({name:"leon",email:""});
        expect(response1.status).toBe(400)
        expect(response1.body).toBe("Email is required")

    })

    it("duplicate items",async ()=>{
        const response1= await request(app).post("/api/teacher").send({name:"leon",email:"leon@gmail.com"});
        const response2= await request(app).post("/api/teacher").send({name:"leon",email:"leon@gmail.com"});

        expect(response2.status).toBe(404)
    })
})



describe("GET /api/teacher/:id",()=>{
    it("should return the id teacher",async ()=>{

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

    it("wrong id is given",async ()=>{

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

    it("when no Teacher",async ()=>{

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
})



describe("Delete /api/teacher/:id",()=>{
    it("Delete the Teacher",async ()=>{

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
})


