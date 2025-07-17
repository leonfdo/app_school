
const {createTeacher} = require("../../controller/teacher.controller")
const Teacher = require("../../models/teacher.model")

const mockRequest = ()=>{
    return {
        body: {
            name : "leon",
            email : "leon@gmail"
        }
}
}


const mockResponse = ()=>{
    return{
        status : jest.fn().mockReturnThis(),
        json : jest.fn().mockReturnThis()
    }
}

const mockUser = {
    _id : "hjwvcqadvcwadaxascac",
    name : "leon" , 
    email : "leon@gmail"
}

afterEach(()=>{
    jest.restoreAllMocks();
})

describe("testing the creation of  a teacher",()=>{
    it("should register the teacher",async ()=>{

        jest.spyOn(Teacher,"create").mockResolvedValueOnce(mockUser)

        const mockReq = mockRequest()
        const mockResp = mockResponse()

        //console.log(mockReq,mockResp)

        await createTeacher(mockReq,mockResp)

        expect(mockResp.status).toHaveBeenCalledWith(200);
        expect(mockResp.json).toHaveBeenCalledWith(mockUser)
         expect(Teacher.create).toHaveBeenCalledWith({
            name : "leon" , 
            email : "leon@gmail"
        })

    })


    it("throwing validation error",async()=>{
        const mockReq = mockRequest().body={body:{}}
        const mockResp = mockResponse()
        
        await createTeacher(mockReq,mockResp)

        expect(mockResp.status).toHaveBeenCalledWith(500);
        expect(mockResp.json).toHaveBeenCalledWith("internal server error")
    })
})