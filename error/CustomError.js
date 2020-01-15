module.exports = class CustomError extends Error {
    constructor(message, status = 500, controller = 'Controller is not defined (:') {
        super(message);
        this.status = status;
        this.controller = controller;
        Error.captureStackTrace(this, this.constructor)
    }
};
