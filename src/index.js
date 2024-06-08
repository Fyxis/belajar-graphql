require('dotenv').config()
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema')
const app = express()
const PORT = 4000

app.use(express.json(), express.urlencoded({ extended: true }))

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
  pretty: true,
}))

app.listen(PORT, () => {
  console.log(`Server has listen at port ${PORT}`)
})