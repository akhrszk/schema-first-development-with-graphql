const { join } = require('path')
const { ApolloServer } = require('apollo-server')
const { loadSchemaSync } = require('@graphql-tools/load')
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader')

// Load schema from the file
const schema = loadSchemaSync(join(__dirname, '../../backend/schema.graphql'), {
  loaders: [new GraphQLFileLoader()]
})

const server = new ApolloServer({
  schema,
  mocks: true
})

server.listen().then(({ url }) =>
  console.log(`🚀 Server ready at ${url}`)
)
