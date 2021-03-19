const User = require('../models/user');
const { generateJwtToken } = require('../utils/auth');
const { notFound, unauthorized } = require('../utils/apiError');
const { successResponse } = require('../utils/apiResponse');
const { re } = require('mathjs');

const addUser = async (req, res, next) => {
    //check whether user exists with same mobile number
    // const userFound = await User.findOne({ where: { mobileNumber: body.mobileNumber }})
    // if(userFound) 
    //     return Promise.reject(unauthorized("Mobile number is already taken", 401))

    // const user = await User.create(body);
    // // add the user auth
    // const userBody = body;
    // userBody.userId = user.id;
    // await AuthUser.create(userBody)

    // return Promise.resolve(user)
    try {
        const user = new User(req.body)
        await user.save();
        return res.status(200).json({

        })
    }
    catch(err) {
        next(err)
    }
}

const getUserById = async (id) => {
	const user = await User.findOne({ where: { id }})
	if (!user) {
		return Promise.reject('Cannot find user with that id')
	}

	return Promise.resolve(user)
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password)
		console.log(" user ", user);
        // just return the token to the user
        const token = await generateJwtToken(user)
        // return Promise.resolve("Bearer "+token)
        res.status(200).json({
            token: `Bearer ${token}`
        })
    }
    catch(err){
        next(err)
    }
}

const checkMobileNumber = async (body) => { 
    const { mobileNumber } = body;
    const user = await User.findOne({ where : { mobileNumber }})
    console.log(" user ", user)
    if(!user) {
        return Promise.resolve({ mobileNumberExists: false })
    }
    return Promise.resolve({ mobileNumberExists: true })
}

const addAuthUser = async (body) => {
    const addedAuthUser = await AuthUser.create(body)
    if(!addedAuthUser) {
        return Promise.reject("Cannot add user")
    }
    return Promise.resolve(addedAuthUser)
}

const getCurrentUser = async(req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id }})
        return successResponse(res, user)
    }
    catch(e) {
        next(e)
    }
}

module.exports = {
    addUser,
    getUserById,
    login,
    checkMobileNumber,
    addAuthUser,
    getCurrentUser
}