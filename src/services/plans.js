const get = async (properties) => {
    // eslint-disable-next-line no-console
    console.log(properties)
    const smartMeiRepository = new properties.dependencies.repositories.SmartMeiRepository(properties)
    const plans = await smartMeiRepository.getPlans({})
    properties.logger.log(plans)
    const result = {
        consultationDate: await properties.dependencies.services.plans.consultationDate(),
        description: await properties.dependencies.services.plans.description(),
        value: {
            BRL: await properties.dependencies.services.plans.brl(),
        },
    }
    return result
}

const consultationDate = async (properties) => {
    return ''
}
const description = async (properties) => {
    return ''
}
const brl = async (properties) => {
    return ''
}

module.exports = {
    get,
    consultationDate,
    description,
    brl,
}