const config = require('./config')
const Indexer = require('./src/crosscut/wrappers/Indexer')

async function init() {
    const indexer = new Indexer()
    const dependencies = indexer.load('./src')
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(dependencies, null, 2))
    const httpServer = new dependencies.crosscut.wrappers.HttpServer()
    httpServer.useAlways((_, response, next) => {
        Object.assign(response.locals, { dependencies })
        return next()
    })
    return httpServer
        .setPort(config.port)
        .listen()
}

init()