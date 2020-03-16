class Cache {
    constructor() {
        if (!Cache.data) {
            Cache.data = {}
            Cache.self = Cache
        }
    }

    log(...args) {
        // eslint-disable-next-line no-console
        console.log.apply(console, args)
    }

    get(key) {
        const now = Date.now()
        this.log(`Accessing '${key}' content at ${now}`)
        const content = Cache.data[key]
        if (!content) {
            return null
        }
        this.log({ content })
        const isInfinity = content.expireAt === -1
        const expired = content.expireAt < now
        const shouldDelete = (!isInfinity) && expired
        if (shouldDelete) {
            // eslint-disable-next-line no-console
            this.log(`Removing property '${key}' expired at ${content.expireAt} - now ${now}`)
            this.remove(key)
            return null
        }
        return {
            value: JSON.parse(content.value),
            expireAt: content.expireAt,
            createdAt: content.createdAt,
        }
    }

    remove(key) {
        delete Cache.data[key]
        return this
    }

    createValue(stringValue, options) {
        return {
            value: stringValue,
            expireAt: options.expireAt || -1,
            createdAt: Date.now(),
        }
    }

    set(key, value, options = {}) {
        const stringValue = JSON.stringify(value)
        this.log(`Setting key: ${key} options: ${options} value: ${stringValue}`)
        Cache.data[key] = this.createValue(stringValue, options)
        return this
    }
    
    cleanAll() {
        Cache.data = {}
        return this
    }
}

module.exports = new Cache()