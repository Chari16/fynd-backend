const jwt = require('jsonwebtoken');
const config = require('../config/index')


/**
 * Generate new token with user id
 *
 * @param user
 */
const generateJwtToken = (data) => {
	const {secrets} = config

	const {
		name,
		type,
		_id
    } = data

	return jwt.sign({ name, type, _id: _id.toString() }, secrets.jwt, {
		expiresIn: secrets.jwtExp,
	})
}

/**
 * Validate token
 *
 * @param token
 */
const verifyToken = (token) =>
	// console.log(" in verify ", token)
	new Promise((resolve, reject) => {
		jwt.verify(token, config.secrets.jwt, (err, payload) => {
			if (err) {
				console.log(" jwt err ", err)
				return reject(err)
			}
			console.log(" payload ", payload)
			resolve(payload)
		})
	})

/**
 * Get token from request
 *
 * If find token in query then place it in the header
 *
 * @param req
 */


const getTokenFromRequest = (req) => {

	const authorization = req.headers.authorization

	if (authorization && authorization.split(' ')[0] === 'Bearer') {
		return req.headers.authorization.split(' ')[1].trim()
	}

	return null
}

const checkRole = role => (req, res, next) => {
	console.log(" my req user here ", req.user)
	console.log(" role ", role)
    req.user.type != role
        ? res.status(401).send({ message: "User does not have access to this route"})
        : next();
}

module.exports = {
    generateJwtToken,
    getTokenFromRequest,
    verifyToken,
	checkRole
}