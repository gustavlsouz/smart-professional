const environment = process.env.NODE_ENV || 'local'

// eslint-disable-next-line no-console
console.log(`Loading ${environment} config file`)

const config = require(`./${environment}.json`)

// eslint-disable-next-line no-console
console.log('Config content', JSON.stringify(config, null, 2))

module.exports = config