import { checkSchema } from 'express-validator'
import { DATABASE } from './db.js'
const registerSchema = checkSchema({
  name: {
    trim: true,
    escape: true,
    notEmpty: {
      errorMessage: 'El nombre es obligatorio'
    },
    isLength: {
      options: { min: 1, max: 100 },
      errorMessage: 'El nombre debe tener entre 1 y 100 caracteres'
    }
  },
  email: {
    trim: true,
    isEmail: {
      errorMessage: 'Debe ser un correo electrónico válido'
    },
    normalizeEmail: true,
    notEmpty: {
      errorMessage: 'El correo electrónico es obligatorio'
    }
  },
  password: {
    trim: true,
    isLength: {
      options: { min: 6 },
      errorMessage: 'La contraseña debe tener al menos 6 caracteres'
    },
    notEmpty: {
      errorMessage: 'La contraseña es obligatoria'
    }
  }
})

const loginSchema = checkSchema({
  email: {
    trim: true,
    isEmail: {
      errorMessage: 'Debe ser un correo electrónico válido'
    },
    normalizeEmail: true,
    notEmpty: {
      errorMessage: 'El correo electrónico es obligatorio'
    }
  },
  password: {
    trim: true,
    isLength: {
      options: { min: 6 },
      errorMessage: 'La contraseña debe tener al menos 6 caracteres'
    },
    notEmpty: {
      errorMessage: 'La contraseña es obligatoria'
    }
  }
})

const checkEmailAlreadyExists = (email) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users WHERE email = ?'
    DATABASE.get(sql, [email], (err, row) => {
      if (err) {
        reject(err)
      } else {
        resolve(row)
      }
    })
  })
}

const loginUser = (email, password) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users WHERE email = ?'
    DATABASE.get(sql, [email], (err, row) => {
      if (err) {
        reject(err)
      } else {
        resolve(row)
      }
    })
  })
}

const createUser = (id, username, name, email, password) => {
  console.table({ id, username, name, email, password })
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO users (id, username, name, email, password) VALUES (?, ?, ?, ?, ?)'

    DATABASE.run(sql, [id, username, name, email, password], function (err) {
      if (err) {
        reject(err) // Rechaza la promesa con el error
      } else {
        resolve(`A row has been inserted with rowid ${this.lastID}`) // Resuelve la promesa con el ID de la fila insertada
      }
    })
  })
}

export { registerSchema, loginSchema, createUser, loginUser, checkEmailAlreadyExists }
