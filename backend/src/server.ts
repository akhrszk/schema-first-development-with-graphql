import { join } from 'path'
import Fastify from 'fastify'
import cors from 'fastify-cors'
import mercurius from 'mercurius'
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { addResolversToSchema } from '@graphql-tools/schema'

import { resolvers } from './resolvers'
import { buildContext } from './context'

// Load schema from the file
const schema = loadSchemaSync(join(__dirname, '../schema.graphql'), {
  loaders: [new GraphQLFileLoader()]
})

// Add resolvers to the schema
const schemaWithResolvers = addResolversToSchema({
  schema, resolvers
})

const fastify = Fastify()

fastify.register(cors, {
  origin: 'http://localhost:3000'
})

fastify.register(mercurius, {
  schema: schemaWithResolvers,
  context: buildContext,
  graphiql: true
})

fastify.listen(4000, '0.0.0.0', (err, addr) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.info(`Server listening on ${addr}`)
})
