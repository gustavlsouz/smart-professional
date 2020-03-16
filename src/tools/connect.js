const connect = (options = {}) => {
    const {
        method,
        props,
    } = options
    return async (...args) => {
        // eslint-disable-next-line no-console
        console.log(args)
        const result = await method({
            ...args[0],
            ...props,
        })
        return result
    }
}

module.exports = connect