class ApiResponse {
  constructor(statusCode = 200, data = null, message = "success") {
    this.statusCode = statusCode;
    this.success = true;
    this.message = message;
    this.data = data;
  }
}

export default ApiResponse;