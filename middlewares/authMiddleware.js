// import jwt from 'jsonwebtoken'
import { secretKey } from '../configs.js'

export const verifyToken = (req, res, next) => {
  // Middleware para verificar JWT
  console.log(secretKey)

}
