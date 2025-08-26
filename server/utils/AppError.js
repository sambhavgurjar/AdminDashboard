class AppError extends Error{
    constructor(msg, statusCode) {
        super(msg);
        this.statuscode = statusCode
    }
}

module.exports =AppError;