
module.exports = class ErrorHandler {
    static create(errorObject) {
        return Object.assign(new Error(), {
            code: errorObject.code,
            reason: errorObject.reason,
            userMessage: errorObject.userMessage,
            statusCode: errorObject.statusCode,
        })
    }
}