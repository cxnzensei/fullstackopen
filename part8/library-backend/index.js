const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const { makeExecutableSchema } = require('@graphql-tools/schema')
require('dotenv').config()
const process = require('process')
const express = require('express')
const http = require('http')

const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

const mongoose = require('mongoose')

const User = require('./models/User')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const uri = process.env.MONGODB_URI

const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')

console.log('Connecting to MongoDB .....')
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.log(`Couldn't connect to MongoDB: ${err.message}`)
  })

mongoose.set('debug', true)

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const schema = makeExecutableSchema({typeDefs, resolvers})

  const subscriptionServer = SubscriptionServer.create({
    schema,
    execute,
    subscribe
  }, {
    server: httpServer,
    path: ''
  })
  
  const server = new ApolloServer({
    schema,
    context: async({req}) => {
      const auth = req ? req.headers.authorization : null
      if(auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(
          auth.substring(7), secret
        )
        const currentUser = await User.findOne({username: decodedToken.username})
        return {currentUser}
      }
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), {
      async serverWillStart() {
        return {
          async drainServer() {
            subscriptionServer.close()
          }
        }
      }
    }]
  })

  await server.start()

  server.applyMiddleware({
    app,
    path: '/'
  })

  const PORT = 4000

  httpServer.listen(PORT, () => console.log(`Server is now running on http://localhost:${PORT}`))
}

start()