import asyncHandler from "../utils/asyncHandler.js";


// controller method to register user
const registerUser = asyncHandler( async(req,res) => {
res.status(200).json({message: "Hello i am post of register"})
})

export {registerUser}