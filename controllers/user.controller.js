const userService  = require('../services/user.service');
const { successResponse } = require('../utils/apiResponse')

createUser = async (req, res, next) => {
    const body = req.body;
    console.log(" body ", body)
    return await userService.addUser(req, res, next);
    // return successResponse(res, "User created successfully")
}

getUser = async (req, res) => {
    try {
        const id = req.params.id
        const user = await userService.getUserById(id)
        return successResponse(res, user)
    }
    catch(e) {
        next(e)
    }
}

login = async (req, res, next) => {
    // try {
    //     const body = req.body;
    //     const token = await userService.login(body);
    //     res.status(200).json({
    //         success: true,
    //         message: "Logged In successfully",
    //         data: { token }
    //     })
    // } 
    // catch(e) { 
    //     next(e)
    // }
    return await userService.login(req, res, next)
}

checkUserExists = async (req, res) => {
    try {
        const body = req.body
        // const user = await userService.getUserById(id)
        const user = await userService.checkMobileNumber(body)
        if(user.mobileNumberExists)
            return successResponse(res, { mobileNumberExists: user.mobileNumberExists })
        else 
            return successResponse(res, { mobileNumberExists: user.mobileNumberExists })
    }
    catch(e) {
        next(e)
    }
}

updateAuthUser = async (req, res) => {
    try {
        const body = req.body
        await userService.updateAuthUser(body)
        return successResponse(res, "User Auth updated successfully")
    }
    catch(e) {
        console.log(" e ", e)
        next(e)
    }
}

getCurrentUser = async (req, res, next) => {
    return await userService.getCurrentUser(req, res, next);
}

checkUser = async (req, res, next) => {
    console.log(" in controller ")
    return await userService.checkUser(req, res, next)
}

// getUserDetails = async(req, res, next) => {
//     console.log(" im herer ")
//     return await userService.getOwnerDetails(req, res, next)
// }

module.exports = {
    createUser,
    getUser,
    login,
    checkUserExists,
    updateAuthUser,
    getCurrentUser,
    checkUser
}