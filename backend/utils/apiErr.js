class ApiErr extends Error {
  constructor(statusCode, message = "Invalid", errors = [], stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.message = message;
    if (stack) {
      this.stack = stack;
    }  else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
module.exports = ApiErr;