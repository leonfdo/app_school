const request = require("supertest")
const app = require("../../index")
const Cources = require("../../models/cources.model")



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
        //expect(response.body.find(())

    })

})

describe ("POST /api/cources",()=>{
    it("should create a cources",async ()=>{
        const response = await request(app).post("/api/cources").send({name:"maths"});
        //console.log(response.body)
        expect(response.status).toBe(200)

        const user_detail = await Cources.find({name: "maths"})

        //console.log(user_detail)

        expect(user_detail[0]._id).not.toBeNull()
        expect(user_detail[0].name).toBe("maths")
        
    })

    it("should return an 404 error when name is not given", async()=>{

        const response1= await request(app).post("/api/cources").send({name:""});
        expect(response1.status).toBe(404)

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
        expect(response.status).toBe(404);
        expect(response.body).toBe("Invalid ID");


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
})



describe("Delete /api/cources/:id",()=>{
    it("Delete the cources",async ()=>{

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
})


