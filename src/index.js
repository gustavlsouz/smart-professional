const Indexer = require('./crosscut/wrappers/Indexer')
const indexer = new Indexer()
const dependencies = indexer.load('./src')
module.exports = dependencies