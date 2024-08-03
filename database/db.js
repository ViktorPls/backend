import sqlite3 from 'sqlite3'

sqlite3.verbose()

const dbName = 'DATABASE.db'

const DATABASE = new sqlite3.Database(dbName, (error) => {
  if (error) {
    return console.error('Error connecting to database:', error.message)
  }
  const sql = 'CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY NOT NULL, username TEXT NOT NULL, name TEXT, email TEXT UNIQUE NOT NULL, password TEXT NOT NULL, salt TEXT NOT NULL)'
  DATABASE.run(sql, (error) => { if (error) console.error('Error creating table:', error.message) })

  console.info('Connected to SQlite database.')
})

export { DATABASE }
