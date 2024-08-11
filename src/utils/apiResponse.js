/**
 * ApiResponse is a class that structures a response.
 * It provides a consistent way to handle API responses by including
 * information such as status code, message, type, and data.
 * This class is designed to be used for sending successful API responses.
 * 
 * @class
 * @param {number} statusCode
 * @param {string} message
 * @param {Object} data - The data to be included in the response. Defaults to an empty object.
 *
 */

class ApiResponse {
  constructor(statusCode = 200,message = "Success", data ={} ) {
    this.status = {
      code: statusCode,
      message: message,
      type: "success",
    };
    this.data = data;
  }
}

export { ApiResponse };