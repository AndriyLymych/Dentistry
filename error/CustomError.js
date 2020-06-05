module.exports = class CustomError extends Error {
    constructor(
        message,
        status = 500,
        controller = 'Controller is not defined (:',
        code=undefined
    ) {
        super(message);
        this.status = status;
        this.code=code;
        this.controller = controller;
        Error.captureStackTrace(this, this.constructor)
    }
};
