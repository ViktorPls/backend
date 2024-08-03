import { DATABASE } from '../database/db.js'

export const findUserByEmail = (email) => {
  const SQL = 'SELECT * FROM users WHERE email = ?'
  const PARAMS = [email]

  return new Promise((resolve, reject) => {
    DATABASE.get(SQL, PARAMS, (err, row) => {
      if (err) {
        // console.error('Error al encontrar usuario:', err)
        reject(err) // Rechaza la promesa en caso de error
      }
      console.log('findUserByEmail:', row)
      resolve(row) // Resuelve la promesa con el resultado si no enuentra devuelve undefined
    })
  })
}

export const createUser = async (userData) => {
  const SQL = 'INSERT INTO users (id, name, username, email, password, salt) VALUES (?, ?, ?, ?, ?, ?)'
  const PARAMS = [userData.id, userData.name, userData.username, userData.email, userData.password, userData.salt]

  return new Promise((resolve, reject) => {
    DATABASE.run(SQL, PARAMS, (err, result) => {
      if (err) {
        console.error('Error al crear usuario:', err)
        reject(err)
      }
      console.log('Usuario encontrado:', result)
      resolve(result)
    })
  })
}

export const updateUser = (id, userData) => {
  // Actualizar un usuario
}

// Llamar a createUserTable en la inicialización del modelo
// createUserTable()
