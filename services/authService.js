import bcrypt from 'bcrypt'
import { randomUUID } from 'node:crypto'
import { findUserByEmail, createUser } from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { saltRounds } from '../configs.js'

// Secret para firmar el token JWT
const JWT_SECRET = 'your_secret_key'
const JWT_EXPIRATION = '1h'

export const registerUser = async (userData) => {
  try {
    const userExist = await findUserByEmail(userData.email)
    if (userExist) {
      return { errors: [{ msg: 'Email already exists' }] }
    }
    /* TODO:
    La función actualmente devuelve un objeto con un campo errors si el usuario ya existe. Sin embargo, es posible que quieras manejar los errores de manera más consistente, por ejemplo, lanzando excepciones o utilizando una estructura uniforme para los errores en toda la aplicación. */

    const id = randomUUID()
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(userData.password, salt)

    userData = { ...userData, id, password: hashedPassword, salt }

    await createUser(userData)

    const token = generateToken({ id, email: userData.email })
    console.log('Token generated >>>>', token)
    return { token }
  } catch (error) {
    console.error('Error in authService:', error)
    return { errors: [{ msg: 'Error creating user' }] }
  }
}

export const authenticateUser = async (email, password) => {
  try {
    const user = await findUserByEmail(email)
    if (!user) {
      return { errors: [{ msg: 'Invalid credentials' }] }
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return { errors: [{ msg: 'Invalid credentials' }] }
    }

    const token = generateToken(user)
    return { token }
  } catch (error) {
    console.error('Error in authService:', error)
    return { errors: [{ msg: 'Error authenticating user' }] }
  }
}

export const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email
  }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION })
}

export const verifyToken = (token) => {
  // Verificar JWT
}

export const hashPassword = async (password) => {
  // Hashear contraseña
}

export const comparePassword = async (password, hash) => {
  const result = await bcrypt.compare(password, hash)
  return result
}
