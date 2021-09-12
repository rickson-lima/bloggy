import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import routes from './routes'

dotenv.config()

const server = express()
const port = process.env.PORT || 3000

mongoose.connect(
  `mongodb+srv://dbAdmin:${process.env.DB_PASSWORD}@clusterbloggy.g1t2e.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
)

server.use(cors())
server.use(express.json())
server.use(routes)

server.listen(port, () => {
  console.log(`API is running on http://localhost:${port}`)
})
