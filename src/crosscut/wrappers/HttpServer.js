const express = require('express')

module.exports = class HttpServer {
    constructor(properties = {}) {
        this.server = properties.server || express()
        this.logger = properties.logger || console
        this.port = 0
    }

    setPort(port = 8080) {
        this.logger.log(`Setting port ${port}`)
        this.port = Number(port)
        return this
    }

    get(path, middlewareFunction) {
        this.logger.log(`Setting get method on path ${path}`)
        this.server.get(path, middlewareFunction)
        return this
    }

    useAlways(func) {
        this.server.use(func)
        return this
    }

    use(path, func) {
        this.server.use(path, func)
        return this
    }

    listen() {
        this.logger.log(`Initializing http server on port ${this.port}`)
        this.server.listen(this.port)
        return this
    }
}