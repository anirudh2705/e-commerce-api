const BadRequestError = require("./bad-request");
const CustomApiError = require("./custom-api-error");
const NotFoundError = require("./not-found");
const UnauthenticatedError = require("./unauthenticated-error");
const UnauthorizedError = require("./unauthorized");

module.exports = {
    BadRequestError,
    CustomApiError,
    NotFoundError,
    UnauthenticatedError,
    UnauthorizedError
}