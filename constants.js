import express from 'express'
import morgan from 'morgan'

const PORT = process.env.PORT ?? 3000
const app = express()

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(express.json())

export { app, PORT }
