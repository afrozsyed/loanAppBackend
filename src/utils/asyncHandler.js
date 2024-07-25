/**
 * asyncHandler is a higher-order function that simplifies error handling
 * in asynchronous route handlers for Express.js.
 * 
 * It takes an asynchronous function (fn) as an argument and returns a new function.
 * This new function executes the provided async function and ensures that any
 * errors thrown during its execution are caught and passed to the next middleware
 * or error handler using Express.js's next function.
 * 
 **/

const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((err) => next(err))
    }
}

export default asyncHandler;