const get = async (properties) => {
    const {
        SmartMeiRepository,
        MoneyRepository,
    } = properties.dependencies.repositories
    const smartMeiRepository = new SmartMeiRepository(properties)
    const moneyRepository = new MoneyRepository(properties)

    const [plans, money] = await Promise.all([
        smartMeiRepository.getPlans({
            font: properties.url
        }),
        moneyRepository.get({}),
    ])

    properties.logger.log({ plans, money })

    const result = plans.value.map(plan => {
        return {
            consultationDate: new Date(plans.createdAt).toJSON(),
            description: plan.type,
            tariffs: plan.tariffs.map(tariff => {
                const factorBRL = (1 / money.value.BRL)
                const factorUSD = (1 / money.value.USD)
                const factorEUR = (1 / money.value.EUR)
                const BRL = tariff.value / factorBRL
                const USD = tariff.value / factorUSD
                const EUR = tariff.value / factorEUR
                return {
                    description: tariff.description,
                    BRL: String(BRL.toFixed(2)),
                    USD: String(USD.toFixed(2)),
                    EUR: String(EUR.toFixed(2)),
                }
            }),
        }
    })
    return result
}

module.exports = {
    get,
}