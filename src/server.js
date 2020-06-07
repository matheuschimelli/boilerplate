import { createServer } from 'http'
import express from 'express'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import passport from 'passport'
import session from 'express-session'
import dotenv from 'dotenv'
import { ApolloServer } from 'apollo-server-express'

import schemas from './schemas'
import resolvers from './resolvers'
dotenv.config({ path: '.env' })

const app = express()
const server = new ApolloServer({
  debug: false,
  typeDefs: schemas,
  resolvers,
  context: async ({ req }) => {
    return {
      user: req
    }
  },
  formatError: (err) => {
    // Don't give the specific errors to the client.
    if (err.message.startsWith('Database Error: ')) {
      return new Error('Internal server error')
    }

    // Otherwise return the original error.  The error can also
    // be manipulated in other ways, so long as it's returned.
    return err
  }
})
/**
 * Apollo GraphQl Middleware
 */
server.applyMiddleware({ app, path: '/graphql' })

app.set('host', process.env.HOST_IP || '0.0.0.0')
app.set('port', process.env.PORT || 8080)
app.use(helmet())
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 1209600000 } // 2 weeks
  })
)
app.use(cors())
app.use(passport.initialize())
app.use(passport.session())

/*
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))
*/

app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})

const httpServer = createServer(app)
function startServer () {
  httpServer.listen({ port: app.get('port') }, () => {
    console.log(`server ready at http://localhost:${app.get('port')}`)
  })
}
startServer()
