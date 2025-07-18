const request = require("supertest")
const mongoose = require("mongoose")
const config = require("config")




describe ("end to end test for the enrollment of the user,teacher and to cources",()=>{

    let user_Id;
    let cource_Id;
    let teacher_Id;

    it("should create a cources",async ()=>{
        const response = await request('http://localhost:3000').post("/api/cources").send({name:"maths_pure"});
        //console.log(response.body)
        expect(response.status).toBe(200)
        //console.log(response.body)
        expect(response.body).toHaveProperty("_id");
        expect(response.body).toHaveProperty("__v");
        expect(response.body).toHaveProperty("name", "maths_pure");
        expect(response.body).toHaveProperty("students",[]);
        expect(response.body).not.toHaveProperty("teacher")
        expect(Object.keys(response.body).length).toBe(4)

        cource_Id = response.body._id
        
    })


    it("should create a teacher",async ()=>{
            const response = await request('http://localhost:3000').post("/api/teacher").send({name:"leon_1",email:"leon1@gmail.com"});
    
            expect(response.status).toBe(200)
            expect(response.body._id).not.toBeNull()
            expect(response.body.name).toBe("leon_1")
            expect(response.body.email).toBe("leon1@gmail.com")
            expect(response.body).toHaveProperty("_id");
            expect(response.body).toHaveProperty("__v");
            expect(Object.keys(response.body).length).toBe(4)

            teacher_Id = response.body._id
        })


        it("should create a user",async ()=>{
                const response = await request('http://localhost:3000').post("/api/user").send({name:"adrian1",email:"adrian1@gmail.com"});
        
                expect(response.status).toBe(200)
                expect(response.body._id).not.toBeNull()
                expect(response.body.name).toBe("adrian1")
                expect(response.body.email).toBe("adrian1@gmail.com")

                user_Id = response.body._id
                
            })

            it("should join the teacher to the cource",async()=>{

            console.log(cource_Id)
            const response = await request('http://localhost:3000').put(`/api/teacher/join/${teacher_Id}`).send({cource:cource_Id});
            
            expect(response.status).toBe(200)
            expect(response.body).toEqual("succefully updated")
            
            
        })



        it("should join the user to the cource",async()=>{
       
                 const response = await request('http://localhost:3000').put(`/api/user/join/${user_Id}`).send({cource:cource_Id});
        
                 expect(response.status).toBe(200)
                 expect(response.body).toEqual("succefully updated")
        
        
            })


        it("should delete the user",async()=>{
            const response = await request('http://localhost:3000').delete(`/api/user/${user_Id}`);

            expect(response.status).toBe(200)
            expect(response.body).toEqual("succefully Deleted")
        })

        it("should delete the teacher",async()=>{
            const response = await request('http://localhost:3000').delete(`/api/teacher/${teacher_Id}`);

            expect(response.status).toBe(200)
            expect(response.body).toEqual("succefully Deleted")
        })


        
        it("should delete the cource",async()=>{
            const response = await request('http://localhost:3000').delete(`/api/cources/${cource_Id}`);

            expect(response.status).toBe(200)
            expect(response.body).toEqual("succefully Deleted")
        })

        

    
})

