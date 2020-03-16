const winston = require('winston')
const uuid = require('uuid')

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error', maxsize: 1000000 }),
        new winston.transports.File({ filename: 'logs/combined.log', maxsize: 1000000 }),
    ]
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