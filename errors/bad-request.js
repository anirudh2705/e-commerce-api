const { StatusCodes } = require("http-status-codes");
const CustomApiError = require("./custom-api-error");

class BadRequestError extends CustomApiError{
    constructor(message){
        super(message)
        this.StatusCodes = StatusCodes.BAD_REQUEST
    }
}

module.exports = BadRequestError