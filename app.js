const config = require('./config')
const Indexer = require('./src/crosscut/wrappers/Indexer')

async function init() {
    const indexer = new Indexer()
    const dependencies = indexer.load('./src')
    console.log(JSON.stringify(dependencies, null, 2))
    const httpServer = new dependencies.crosscut.wrappers.HttpServer()

    return httpServer
        .setPort(config.port)
        .listen()
}

init()