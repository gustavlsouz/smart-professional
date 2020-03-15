const environment = process.env.NODE_ENV || 'local'

console.log(`Loading ${environment} config file`)

const config = require(`./${environment}.json`)

console.log('Config content', JSON.stringify(config, null, 2))

module.exports = config