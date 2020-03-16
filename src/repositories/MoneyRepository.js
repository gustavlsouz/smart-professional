module.exports = class MoneyRepository {
    constructor(properties = {}) {
        this.client = new properties.dependencies.crosscut.wrappers.HttpClient(properties)
        this.ErrorHandler = properties.dependencies.crosscut.ErrorHandler
        this.Errors = properties.dependencies.crosscut.Errors
        this.cache = properties.dependencies.crosscut.Cache
        this.logger = properties.logger
    }
    async get({ base = 'BRL' }) {
        try {
            const data = await this.client.request({
                method: 'get',
                url: 'https://api.exchangeratesapi.io/latest',
                params: {
                    base,
                },
            })
            const vaidResult = !!(data && data.rates)
            if (!vaidResult) {
                throw this.ErrorHandler.create(this.Errors.NO_MONEY_DATA)
            }
            const money = data.rates

            return this.cache
                .set('money', money, { expireAt: -1 })
                .get('money')
        } catch (error) {
            this.logger.error(error)
            this.logger.log('Getting money from cache')
            const money = this.cache.get('money')
            if (!money) {
                throw error
            }
            return money
        }
    }
}