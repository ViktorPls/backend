import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

const PORT = process.env.PORT ?? 3000
const app = express()
const secretKey = 'your_secret_key' // Para JWT
const saltRounds = 10

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(express.static('public'))

app.use(cors())

app.use(express.json())

export { app, PORT, secretKey, saltRounds }
