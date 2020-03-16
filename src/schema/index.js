const fs = require('fs')
const path = require('path')

const { buildSchema } = require('graphql');

const content = fs.readFileSync(path.join(__dirname, './schema'), { encoding: 'utf8' })
const schema = buildSchema(content);

module.exports = schema