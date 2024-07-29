const BadRequest = require("./bad-request");
const CustomApiError = require("./custom-api-error");
const NotFoundError = require("./not-found");
const UnauthenticatedError = require("./unauthenticated-error");

module.exports = {
    BadRequest,
    CustomApiError,
    NotFoundError,
    UnauthenticatedError
}