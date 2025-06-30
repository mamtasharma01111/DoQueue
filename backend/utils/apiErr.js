// utils/apiErr.js
class ApiErr extends Error {
  constructor(statusCode, message, errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.name = 'ApiError';
  }
}

module.exports = { ApiErr };
