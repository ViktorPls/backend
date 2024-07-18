import { app, PORT } from './configs.js'
import { userController } from './controllers/userController.js'
import { LoginController } from './controllers/loginController.js'
import { loginSchema, registerSchema } from './user-repository.js'

app.get('/', (req, res) => res.send('<h1>Hello World!</h1>'))

app.post('/register', registerSchema, userController)

app.post('/login', loginSchema, LoginController)

app.post('/logout', (req, res) => { })

app.get('/protected', (req, res) => { })

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
)
