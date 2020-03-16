const config = require('./config')
const dependencies = require('./src')

const graphqlHTTP = require('express-graphql');

async function init() {

    const logger = new dependencies.crosscut.wrappers.Logger()
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(dependencies, null, 2))
    const httpServer = new dependencies.crosscut.wrappers.HttpServer({ logger })

    const { connect } = dependencies.tools
    const rootValue = {
        plans: connect({
            method: dependencies.services.plans.get,
            props: {
                logger,
                dependencies,
            },
        }),
    };

    httpServer.useAlways((_, response, next) => {
        Object.assign(response.locals, {
            dependencies,
            config,
        })
        return next()
    }).use('/querying', graphqlHTTP({
        schema: dependencies.schema,
        rootValue,
        graphiql: config.graphiql,
    }))

    return httpServer
        .setPort(config.port)
        .listen()
}

init()