import express from 'express'
import morgan from 'morgan'
import fs from 'node:fs'

// Constants or Configs //
const PORT = process.env.PORT ?? 3000
const app = express()

// Settings oder Configs //
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.urlencoded())

// app.METHOD(PATH, HANDLER) //
app.get('/', function (req, res) {
  res.sendFile('index.html', { root: './' })
})

app.post('/register', function (req, res) {
  const { name, email, password } = req.body

  const htmlStream =
    fs.readFileSync('register.html', 'utf-8', (error, data) => {
      if (error) {
        console.log('Error:', error)
        return
      }
      console.log('Data:', data)
      return data
    })
  const htmlWithUserData = htmlStream.replace('{{ UserData }}', `Name: ${name}, Email: ${email}, Password: ${password}`)

  res.send(htmlWithUserData)
})

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
)
