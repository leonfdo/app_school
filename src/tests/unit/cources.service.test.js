const {createCources,getCources,getCource} = require("../../services/cources.services")
const Cources = require("../../models/cources.model")
const mongoose = require("mongoose")
const { invalidId } = require("../../error")


require("../setupDB")

describe("testing createCource()",()=>{
    it("should register the Cource",async ()=>{
    
    
    const input = {
        "name":"maths"
    }

    const mockResp = await createCources(input)

    expect(mockResp).toEqual(expect.objectContaining({
    name: "maths",
    _id: expect.any(Object), // or expect.any(mongoose.Types.ObjectId)
    __v: expect.any(Number)
    }));

    })


    it("should fail when name is missing", async () => {
        const input = { name: "" };
        await expect(createCources(input)).rejects.toThrow();
    });

    it("should fail when duplicate Cources given", async () => {

        const input1 = {
        "name":"maths"

    }

    const input2 = {
        "name":"maths"
    }

        try{
        const mockResp1 = await createCources(input1)
        const mockResp2 = await createCources(input2)
        }catch(err){
            expect(err).toBeDefined();
            expect(err.code).toBe(11000); 
        }
        
});
})


describe("getCources()", () => {
  it("should return all Users", async () => {
    await Cources.create({ name: "maths"});
    await Cources.create({ name: "pure"});

    const result = await getCources();

    expect(result.length).toBe(2);
    expect(result[0]).toHaveProperty("name", "maths");
    expect(result[0]).toHaveProperty("_id");
    expect(result[0]).toHaveProperty("__v");
  });

  it("should return an empty array when no Users exist", async () => {
    const result = await getCources();
    expect(result).toEqual([]);
  });
})

describe("getCource()", () => {
  it("should return Cource data when a valid ID is provided", async () => {
    // Create a teacher in DB
    const createdCource = await Cources.create({
      name: "maths"
    });

    const result = await getCource(createdCource._id);

    expect(result).toHaveProperty("_id", createdCource._id);
    expect(result).toHaveProperty("name", "maths");
  });

  it("should throw invalidId error when Cource not found", async () => {

    const fakeId = new mongoose.Types.ObjectId();
    await expect(getCource(fakeId)).rejects.toThrow("No cource with this ID");
    await expect(getCource(fakeId)).rejects.toThrow(invalidId);
   
  });



})