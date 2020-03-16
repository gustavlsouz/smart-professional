const connect = (options = {}) => {
    const {
        method,
        props,
    } = options
    return async (...args) => {
        // eslint-disable-next-line no-console
        const parameters = args[0]
        props.logger.log(parameters)
        const result = await method({
            ...parameters,
            ...props,
        })
        return result
    }
}

module.exports = connect