const httpStatus = require('http-status');

const ErrorCode = {
    passwordNotCorrect: 101,
	emailNotCorrect : 102,
	emailNotFound : 103,
	emailNotUnique : 104,
	resetTokenInvalid : 105,
	notActiveUser : 106,
	notHasPermission : 107,
	googleAccountHasBeenLinked : 108,
	googleAccountHasBeenTaken : 109
}

class ApiError extends Error {
    constructor(message, status, errorCode) {
		super(message)
		this.status = status
		this.errorCode = errorCode
		this.name = this.constructor.name
		Error.captureStackTrace(this, this.constructor)
	}
}

const badRequest = (message = 'Invalid params', errorCode) => {
	return new ApiError(message, httpStatus.BAD_REQUEST, errorCode)
}

const unauthorized = (message = 'Unauthorized', errorCode) => {
	return new ApiError(message, httpStatus.UNAUTHORIZED, errorCode)
}

const notFound = (message = 'Not found', errorCode) => {
	return new ApiError(message, httpStatus.NOT_FOUND, errorCode)
}

const internalServer = (message = 'Unexpected server error', errorCode) => {
	return new ApiError(message, httpStatus.INTERNAL_SERVER_ERROR, errorCode)
}

module.exports = {
    badRequest,
    unauthorized,
    notFound,
	internalServer,
	ApiError
};