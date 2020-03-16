const assert = require('assert');
const { wait } = require('../../../../src/crosscut/time')
const dependencies = require('../../../../src')
const fs = require('fs')
const path = require('path')
const smartMeiHtml = fs.readFileSync(path.join(__dirname, '../../../mock/smartmei.html'), { encoding: 'utf8' })

describe('Plans test', () => {
    beforeEach(() => {
        dependencies.crosscut.Cache.cleanAll()
    })
    it('Simple test', async () => {
        const { plans } = dependencies.services
        const properties = {
            dependencies: {
                ...dependencies,
                repositories: {
                    ...dependencies.repositories,
                    SmartMeiRepository: class SmartMeiRepositoryMock {
                        async getPlans() {
                            return {
                                "value": [
                                    {
                                        "type": "professional",
                                        "tariffs": [
                                            {
                                                "value": 7,
                                                "description": "Transferência"
                                            }
                                        ]
                                    }
                                ],
                                "expireAt": -1,
                                "createdAt": 1584362465475
                            }
                        }
                    },
                    MoneyRepository: class MoneyRepositoryMock {
                        async get() {
                            return {
                                "value": {
                                    "BRL": 1,
                                    "EUR": 0.1921524922,
                                    "USD": 0.2133661274,
                                },
                                "expireAt": -1,
                                "createdAt": 1584362465152
                            }
                        }
                    },
                },
            },
            url: 'https://www.smartmei.com.br/',
            logger: console
        }
        const result = await plans.get(properties)
        console.log(result)
        assert.ok(true)
    })

    it('Test cache in service flux', async () => {
        let count = 0
        const { plans } = dependencies.services
        const properties = {
            dependencies: {
                ...dependencies,
                crosscut: {
                    ...dependencies.crosscut,
                    wrappers: {
                        ...dependencies.crosscut.wrappers,
                        HttpClient: class HttpClientMock {
                            async request({ url }) {
                                count++
                                if (count >= 3) {
                                    throw new Error('No result')
                                }
                                if (url.includes('smartmei')) {
                                    return smartMeiHtml
                                }
                                if (url.includes('exchangeratesapi')) {
                                    return {
                                        "rates": {
                                            "CAD": 0.2957034703,
                                            "HKD": 1.6574113216,
                                            "ISK": 28.8228738327,
                                            "PHP": 10.8475846432,
                                            "DKK": 1.4359940048,
                                            "HUF": 65.1166365628,
                                            "CZK": 5.0040352023,
                                            "GBP": 0.1711502248,
                                            "RON": 0.9264248107,
                                            "SEK": 2.0839514238,
                                            "IDR": 3151.4180853926,
                                            "INR": 15.7327735291,
                                            "BRL": 1,
                                            "RUB": 15.5141039929,
                                            "HRK": 1.4532492986,
                                            "JPY": 22.8872833481,
                                            "THB": 6.7722224357,
                                            "CHF": 0.2038353637,
                                            "EUR": 0.1921524922,
                                            "MYR": 0.91287806,
                                            "BGN": 0.3758118443,
                                            "TRY": 1.3421851581,
                                            "CNY": 1.4908535414,
                                            "NOK": 2.1322393451,
                                            "NZD": 0.3481803159,
                                            "ZAR": 3.4440451943,
                                            "USD": 0.2133661274,
                                            "MXN": 4.5700587987,
                                            "SGD": 0.3013719688,
                                            "AUD": 0.3398024672,
                                            "ILS": 0.7852695899,
                                            "KRW": 257.7495100111,
                                            "PLN": 0.8372084086
                                        },
                                        "base": "BRL",
                                        "date": "2020-03-13"
                                    }
                                }
                            }
                        }
                    }
                },
            },
            url: 'https://www.smartmei.com.br/',
            logger: console
        }
        const result = await plans.get(properties)
        console.log(result)
        const resultB = await plans.get(properties)
        console.log(resultB)
        assert.deepEqual(result, resultB)
    })
})