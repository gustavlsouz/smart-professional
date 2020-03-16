const winston = require('winston')
const uuid = require('uuid')
const { combine, prettyPrint, json, timestamp } = winston.format

const transports = [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error', maxsize: 1000000 }),
    new winston.transports.File({ filename: 'logs/combined.log', maxsize: 1000000 }),
    new winston.transports.Console(),
]
const getFormat = () => {
    if (process.env.NODE_ENV === 'production') {
        return combine(json(), timestamp())
    }
    return combine(json(), timestamp(), prettyPrint())
}
const logger = winston.createLogger({
    level: 'info',
    format: getFormat(),
    transports,
});

module.exports = class Logger {
    constructor(properties = {}) {
        this.logger = properties.console || logger
        this.signature = Object.freeze({
            instanceUid: uuid.v4(),
            createdAt: new Date(),
        })
    }


    callLogger({ method = 'info', content, metadata }) {
        this.logger[method]({
            signature: this.signature,
            content,
            metadata,
        })
    }

    log(content, metadata) {
        this.callLogger({ method: 'info', content, metadata })
    }

    error(content, metadata) {
        this.callLogger({ method: 'error', content, metadata })
    }
}