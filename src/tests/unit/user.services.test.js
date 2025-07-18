const {createUser,getUsers,getUser} = require("../../services/user.services")
const User = require("../../models/user.model")
const mongoose = require("mongoose")
const { invalidId } = require("../../error")


require("../setupDB")

describe("testing createUser()",()=>{
    it("should register the User",async ()=>{
    
    
    const input = {
        "name":"leon",
        "email":"leon@gmail.com"
    }

    const mockResp = await createUser(input)

    expect(mockResp).toEqual(expect.objectContaining({
    name: "leon",
    email: "leon@gmail.com",
    _id: expect.any(Object), // or expect.any(mongoose.Types.ObjectId)
    __v: expect.any(Number)
    }));

    })


    it("should fail when email is missing", async () => {
        const input = { name: "leon" };
        await expect(createUser(input)).rejects.toThrow();
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
        const mockResp1 = await createUser(input1)
        const mockResp2 = await createUser(input2)
        }catch(err){
            expect(err).toBeDefined();
            expect(err.code).toBe(11000); 
        }
        
});
})


describe("getUsers()", () => {
  it("should return all Users", async () => {
    await User.create({ name: "Leon", email: "leon@gmail.com" });
    await User.create({ name: "Anna", email: "anna@gmail.com" });

    const result = await getUsers();

    expect(result.length).toBe(2);
    expect(result[0]).toHaveProperty("name", "Leon");
    expect(result[0]).toHaveProperty("email", "leon@gmail.com");
    expect(result[0]).toHaveProperty("_id");
    expect(result[0]).toHaveProperty("__v");
  });

  it("should return an empty array when no Users exist", async () => {
    const result = await getUsers();
    expect(result).toEqual([]);
  });
})

describe("getUser()", () => {
  it("should return User data when a valid ID is provided", async () => {
    // Create a teacher in DB
    const createdUser = await User.create({
      name: "Leon",
      email: "leon@gmail.com",
    });

    const result = await getUser(createdUser._id);

    expect(result).toHaveProperty("_id", createdUser._id);
    expect(result).toHaveProperty("name", "Leon");
    expect(result).toHaveProperty("email", "leon@gmail.com");
  });

  it("should throw invalidId error when User not found", async () => {

    const fakeId = new mongoose.Types.ObjectId();
    await expect(getUser(fakeId)).rejects.toThrow("no user with this ID");
    await expect(getUser(fakeId)).rejects.toThrow(invalidId);
   
  });



})