import { loginUser } from '../user-repository.js'
import { validationResult } from 'express-validator'

const LoginController = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  // User authentication logic
  const { email, password } = req.body
  const user = await loginUser(email, password)
  if (user) {
    return res.status(200).json({ message: 'User logged in successfully', user })
  } else {
    return res.status(401).json({ message: 'Invalid credentials' })
  }
}

export { LoginController }
