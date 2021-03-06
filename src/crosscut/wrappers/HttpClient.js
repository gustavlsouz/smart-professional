const axios = require('axios')

module.exports = class HttpClient {
    constructor(properties) {
        this.logger = properties.logger || console
        this.client = properties.client || axios
    }

    async request(options = {}) {
        try {
            this.logger.log('Http Request. ', options.url)
            this.logger.log(options)
            const response = await this.client({
                method: options.method,
                url: options.url,
                data: options.data,
                params: options.params,
            })
            this.logger.log('Http Request finished. ', options.url)
            const dataAsString = response.data && Object.is(response.data.__proto__, String.prototype)
            if (dataAsString) {
                this.logger.log(response.data.substring(0, 1000))
            } else {
                this.logger.log(response.data)
            }
            this.logger.log(response.status)
            this.logger.log(response.statusText)
            this.logger.log(response.headers)
            return response.data
        } catch (error) {
            this.logger.error(error)
            throw error
        }
    }
}