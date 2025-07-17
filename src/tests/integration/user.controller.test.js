const request = require("supertest")
const app = require("../../index")
const User = require("../../models/user.model")
const Cources = require("../../models/cources.model")



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

    })

})

describe ("POST /api/user",()=>{
    it("should create a user",async ()=>{
        const response = await request(app).post("/api/user").send({name:"leon",email:"leon@"});

        expect(response.status).toBe(200)

        const user_detail = await User.find({email: "leon@"})

        //console.log(user_detail)

        expect(user_detail[0]._id).not.toBeNull()
        expect(user_detail[0].name).toBe("leon")
        expect(user_detail[0].email).toBe("leon@")
        
    })

    it("should return an error when email is not given", async()=>{

        const response1= await request(app).post("/api/user").send({name:"leon",email:""});
        expect(response1.status).toBe(404)
        expect(response1.body).toBe("undefined request body of name or email")

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
        expect(response.status).toBe(404);
        expect(response.body).toBe("Invalid ID");


    })

    it("when no user",async ()=>{

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


        const response = await request(app).put(`/api/user/${id}`).send({name:"leon_fdo",email:"leon@"});;
        expect(response.status).toBe(200);

        const user = await User.findById(id)
        expect(user.name).toBe("leon_fdo")
        expect(user.email).toBe("leon@")


    })
})



describe("Delete /api/user/:id",()=>{
    it("Delete the user",async ()=>{

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


