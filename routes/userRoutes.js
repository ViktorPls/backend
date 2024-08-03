import { Router } from 'express'
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/userController'
import { registerSchema, loginSchema } from '../user-repository'

const router = Router()

router.post('/register', registerSchema, createUser)
router.post('/login', loginSchema, getUsers)
router.get('/', getUsers)
router.get('/:id', getUserById)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router
