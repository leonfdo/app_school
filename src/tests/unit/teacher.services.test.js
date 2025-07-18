const {createTeacher,getTeachers,getTeacher} = require("../../services/teacher.services")
const Teacher = require("../../models/teacher.model")
const mongoose = require("mongoose")
const { invalidId } = require("../../error")


require("../setupDB")

describe("testing createTeacher()",()=>{
    it("should register the teacher",async ()=>{
    
    
    const input = {
        "name":"leon",
        "email":"leon@gmail.com"
    }

    const mockResp = await createTeacher(input)

    expect(mockResp).toEqual(expect.objectContaining({
    name: "leon",
    email: "leon@gmail.com",
    _id: expect.any(Object), // or expect.any(mongoose.Types.ObjectId)
    __v: expect.any(Number)
    }));

    })


    it("should fail when email is missing", async () => {
        const input = { name: "leon" };
        await expect(createTeacher(input)).rejects.toThrow();
    });

    it("should fail when duplicate emails given", async () => {

        const input1 = {
        "name":"leon",
        "email":"leon@gmail.com"
    }

    const input2 = {
        "name":"leon_fdo",
        "email":"leon@gmail.com"
    }

        try{
        const mockResp1 = await createTeacher(input1)
        const mockResp2 = await createTeacher(input2)
        }catch(err){
            expect(err).toBeDefined();
            expect(err.code).toBe(11000); 
        }
        
});
})


describe("getTeachers()", () => {
  it("should return all teachers", async () => {
    await Teacher.create({ name: "Leon", email: "leon@gmail.com" });
    await Teacher.create({ name: "Anna", email: "anna@gmail.com" });

    const result = await getTeachers();

    expect(result.length).toBe(2);
    expect(result[0]).toHaveProperty("name", "Leon");
    expect(result[0]).toHaveProperty("email", "leon@gmail.com");
    expect(result[0]).toHaveProperty("_id");
    expect(result[0]).toHaveProperty("__v");
  });

  it("should return an empty array when no teachers exist", async () => {
    const result = await getTeachers();
    expect(result).toEqual([]);
  });
})

describe("getTeacher()", () => {
  it("should return teacher data when a valid ID is provided", async () => {
    // Create a teacher in DB
    const createdTeacher = await Teacher.create({
      name: "Leon",
      email: "leon@gmail.com",
    });

    const result = await getTeacher(createdTeacher._id);

    expect(result).toHaveProperty("_id", createdTeacher._id);
    expect(result).toHaveProperty("name", "Leon");
    expect(result).toHaveProperty("email", "leon@gmail.com");
  });

  it("should throw invalidId error when teacher not found", async () => {

    const fakeId = new mongoose.Types.ObjectId();
    await expect(getTeacher(fakeId)).rejects.toThrow("no teacher with this ID");
    await expect(getTeacher(fakeId)).rejects.toThrow(invalidId);
   
  });



})

