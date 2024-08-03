import { Router } from 'express'
import {
  register,
  login,
  logout,
  confirmEmail,
  forgotPassword,
  resetPassword
} from '../controllers/authController.js'
import { loginSchema, registerSchema } from '../models/user-repository.js'
import { verifyToken } from '../middlewares/authMiddleware.js'

const router = Router()

router.post('/register', registerSchema, register)
router.post('/login', loginSchema, login)
router.post('/logout', logout)
router.get('/confirm/:token', confirmEmail)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)

// Ejemplo de ruta protegida
router.get('/protected-route', verifyToken, (req, res) => {
  res.send('This is a protected route')
})

export default router
