import { validationResult } from 'express-validator'

import { registerUser, authenticateUser } from '../services/authService.js'
// import userService from '../services/userService.js'
// import emailService from '../services/emailService.js'

export const register = async (req, res) => {
  // Verificación de errores de validación
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, username, email, password } = req.body
  const newUserData = { name, username, email, password }

  try {
    const result = await registerUser(newUserData)
    if (result.errors) {
      return res.status(400).json(result)
    }
    console.log('authController REGISTER FUNC', result)
    return res.status(201).json({ message: 'User registered successfully', user: result.token })
  } catch (error) {
    // Manejo de errores inesperados
    console.error('Error during user registration:', error)
    return res.status(500).json({ errors: [{ msg: 'Internal server error' }] })
  }
}

export const login = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { email, password } = req.body

    const result = await authenticateUser(email, password)

    if (result.errors) {
      return res.status(401).json(result)
    }

    res.status(200).json({ msg: 'User authenticated successfully', token: result.token })
  } catch (error) {
    console.error('Error authController login:', error)
    return res.status(401).json({ message: 'Invalid credentials' })
  }
}

export const logout = async (req, res) => {
  // Lógica de cierre de sesión
}

export const confirmEmail = async (req, res) => {
  // Lógica de confirmación de correo
}

export const forgotPassword = async (req, res) => {
  // Lógica de solicitud de recuperación de contraseña
}

export const resetPassword = async (req, res) => {
  // Lógica de reseteo de contraseña
}
