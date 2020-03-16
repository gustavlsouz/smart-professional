module.exports = class SmartMeiRepository {
    constructor(properties) {
        this.client = new properties.dependencies.crosscut.wrappers.HttpClient(properties)
        this.handler = new properties.dependencies.crosscut.wrappers.HTMLHandler(properties)
        this.ErrorHandler = properties.dependencies.crosscut.ErrorHandler
        this.Errors = properties.dependencies.crosscut.Errors
        this.cache = properties.dependencies.crosscut.Cache
        this.logger = properties.logger
    }
    async getPlans({ font = 'https://www.smartmei.com.br/' }) {
        try {
            const data = await this.client.request({
                method: 'get',
                url: font,
            })
            const result = this.handler
                .load(data)
                .get('div.text-center.col-sm-4.col-xs-6.tarifas-2-2-2')
            const description = this.handler.get('div.col-sm-4.cell-small-title')
            const validResult = !!(result[0] && description[1])
            if (!validResult) {
                throw this.ErrorHandler.create(this.Errors.PLAN_NOT_FOUND)
            }
            const match = result[0].trim().match(/([0-9]|,)+/)
            if (!match) {
                throw this.ErrorHandler.create(this.Errors.PLAN_NOT_FOUND)
            }
            const value = Number(match[0].replace(',', '.'))
            if (Number.isNaN(value)) {
                throw this.ErrorHandler.create(this.Errors.PLAN_NOT_FOUND)
            }
            const plans = [
                {
                    type: 'professional',
                    tariffs: [
                        {
                            value: value,
                            description: description[1].trim(),
                        },
                    ],
                },
            ]

            return this.cache
                .set('plans', plans, { expireAt: -1 })
                .get('plans')
        } catch (error) {
            this.logger.error(error)
            const plans = this.cache.get('plans')
            if (!plans) {
                throw error
            }
            return plans
        }
    }
}