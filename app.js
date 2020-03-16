const config = require('./config')
const Indexer = require('./src/crosscut/wrappers/Indexer')

const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

async function init() {
    const indexer = new Indexer()
    const dependencies = indexer.load('./src')
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(dependencies, null, 2))
    const httpServer = new dependencies.crosscut.wrappers.HttpServer()
    const schema = buildSchema(`
    type Value {
        BRL: String
    }

    type Plan {
        consultationDate: String
        description: String
        value: Value
    }
    
    type Query {
        plan: Plan
    }
  `);
    const { connect } = dependencies.tools
    const rootValue = {
        plan: connect({
            method: dependencies.services.plans.get,
            props: {
                logger: console,
                dependencies,
            },
        }),
    };

    httpServer.useAlways((_, response, next) => {
        Object.assign(response.locals, { dependencies })
        return next()
    }).use('/querying', graphqlHTTP({
        schema: schema,
        rootValue,
        graphiql: true,
    }))

    return httpServer
        .setPort(config.port)
        .listen()
}

init()