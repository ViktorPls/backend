import bcrypt from 'bcrypt'
import { randomUUID } from 'node:crypto'
import { validationResult } from 'express-validator'
import { createUser, checkEmailAlreadyExists } from '../user-repository.js'

export const userController = function (req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { username, name, email, password } = req.body

  const id = randomUUID()
  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashedPassword = bcrypt.hashSync(password, salt)

  const isExistent = checkEmailAlreadyExists(email).then(
    (emailExists) => {
      console.log('Email exists:', emailExists)
      if (emailExists) {
        return emailExists
          ? res.status(400).json({ errors: [{ msg: 'Email already exists' }] })
          : null
      }
    }
  ).catch(
    (error) => {
      console.error('Error checking email:', error.message)
      return res.status(500).send(error)
    }
  )

  if (isExistent) return

  createUser(id, name, username, email, hashedPassword)
    .then((message) => {
      console.log(message)
      return res.status(201).json({ id, username, name, email })
    })
    .catch((error) => {
      console.error('Error registering user:', error.message)
      res.status(500).send(error)
    })
}
