import { findUserByEmail, createUser, updateUser } from '../models/userModel.js'
import { hashPassword } from './authService.js'

export const getUserByEmail = async (email) => {
  // Obtener usuario por email
}

export const createUserAccount = async (userData) => {
  // Crear cuenta de usuario
}

export const updateUserAccount = async (id, userData) => {
  // Actualizar cuenta de usuario
}
