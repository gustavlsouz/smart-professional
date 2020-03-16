module.exports = class SmartMeiRepository {
    constructor(properties) {
        this.client = new properties.dependencies.crosscut.wrappers.HttpClient(properties)
        this.handler = new properties.dependencies.crosscut.wrappers.HTMLHandler(properties)
    }
    async getPlans({ font = 'https://www.smartmei.com.br/' }) {
        const data = await this.client.request({
            method: 'get',
            url: font,
        })
        const result = this.handler.load(data).get('div.text-center.col-sm-4.col-xs-6.tarifas-2-2-2')
        return [
            {
                type: 'professional',
                value: result[0].trim()
            }
        ]
    }
}