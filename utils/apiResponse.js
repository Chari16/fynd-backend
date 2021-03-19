/**
 * Reponse handlers
 *
 */
const httpStatus = require('http-status')
const {ApiError} = require('./apiError')
const config = require('../config')

/**
 * Send success response
 *
 * @param data: data that response sends to client
 * @param created: whether new data is created or modified
 * @param status: specific http status code that we want to send
 */
const successResponse = (res, data, created) => {
	const responseData = typeof data === 'string' ? {message: data} : data

	let responseStatus = created ? httpStatus.CREATED : httpStatus.OK

	return res.status(responseStatus).json({
		success: true,
		data: responseData
	})
	// return {
	// 	success: true,
	// 	status: responseStatus,
	// 	data: responseData,
	// }
}

/**
 * Send error response
 *
 * @param error error object passed from error handler middleware
 */
const errorResponse = (error) => {
	const {status, errorCode, message} = error

	// Only return error stack if env is develop and status is 500
	const stack =
		config.isDev && status === httpStatus.INTERNAL_SERVER_ERROR
			? error.stack
			: undefined

	return {
		status,
		errorCode,
		message,
		stack,
	}
}

module.exports = {
    successResponse,
    errorResponse
}