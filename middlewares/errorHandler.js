const chalk = require('chalk')
const {ApiError} = require('../utils/apiError')
const httpStatus = require('http-status')
const {errorResponse} = require('../utils/apiResponse')

// const logger = createLogger(module)

/**
 * Middleware to parse Error
 *
 * @param err
 * @param req
 * @param res
 * @param next
 */
const parseError = (err, req, res, next) => {
	if (!(err instanceof ApiError)) {
		const apiError = new ApiError(
			err.message || err.msg,
			err.status || httpStatus.INTERNAL_SERVER_ERROR,
		)
		return next(apiError)
	}

	return next(err)
}

/**
 * Middleware to send Error
 *
 * @param err
 * @param req
 * @param res
 * @param next
 */
const sendError = (err, req, res, next) => {
	const {status, message} = err

	if (status === httpStatus.INTERNAL_SERVER_ERROR) {
		// logger.error(err)
	} else {
		// logger.debug(`${chalk.red('[ERROR]:')} ${message}`)
	}

	res.status(status).json(errorResponse(err))
}

module.exports = {
    errorHandler: [parseError, sendError]
}
