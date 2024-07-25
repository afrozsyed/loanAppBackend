/**
 * ApiError is a custom error class that extends the built-in Error class.
 * It provides a structured way to handle API errors by including additional
 * information such as status code, message, errors array, and stack trace.
 *
 * @class
 * @extends Error
 */

class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };