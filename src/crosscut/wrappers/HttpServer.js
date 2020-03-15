const express = require('express')

module.exports = class HttpServer {
    constructor(properties = {}) {
        this.server = properties.server || express()
        this.logger = properties.logger || console
        this.application = null
        this.port = 0
    }

    setPort(port = 8080) {
        this.logger.log(`Setting port ${port}`)
        this.port = Number(port)
        return this
    }

    get(path, middlewareFunction) {
        this.logger.log(`Setting get method on path ${path}`)
        this.application.get(path, middlewareFunction)
        return this
    }

    listen() {
        this.logger.log(`Initializing http server on port ${this.port}`)
        this.application.listen(this.port)
        return this
    }
}