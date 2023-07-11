const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'something went wrong. Please try again later',
  }

  if (err.name === 'ValidationError') {
    customError.statusCode = StatusCodes.BAD_REQUEST
    const construct = Object.values(err.errors)
      .map((item) => {
        return item.message
      })
      .join('. ')
    customError.message = construct
  }

  if (err.code && err.code === 11000) {
    customError.statusCode = StatusCodes.BAD_REQUEST
    customError.message = 'short link already taken'
  }

  return res.status(customError.statusCode).json({
    message: customError.message,
  })
}

module.exports = errorHandlerMiddleware
