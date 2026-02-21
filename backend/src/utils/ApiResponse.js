class ApiResponse {
    constructor(success, message, data, error,statusCode) {
        this.statusCode = statusCode<400;
        this.success = success;
        this.message = message;
        this.data = data;
        this.error = error;
    }
}

export default ApiResponse