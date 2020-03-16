const get = async (properties) => {
    properties.logger.log(properties)
    const {
        SmartMeiRepository,
        MoneyRepository,
    } = properties.dependencies.repositories
    const smartMeiRepository = new SmartMeiRepository(properties)
    const moneyRepository = new MoneyRepository(properties)

    const [plans, money] = await Promise.all([
        smartMeiRepository.getPlans({}),
        moneyRepository.get({}),
    ])

    properties.logger.log({ plans, money })

    const result = plans.value.map(plan => {
        return {
            consultationDate: new Date(plans.createdAt).toJSON(),
            description: plan.type,
            tariffs: plan.tariffs.map(tariff => {
                const BRL = tariff.value * (1 / money.value.BRL)
                const USD = tariff.value * (1 / money.value.USD)
                const EUR = tariff.value * (1 / money.value.EUR)
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