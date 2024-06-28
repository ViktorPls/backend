import { app, PORT } from './constants.js'
import { body, validationResult } from 'express-validator'

app.post('/register',
  body('email').trim().isEmail(),
  body('name').trim().isString().isLength({ min: 3 }),
  body('password').isString().isLength({ min: 6 }),
  function (req, res) {
    const result = validationResult(req)
    if (!result.isEmpty()) return res.status(400).json({ errors: result.array() })

    const { email, name, password } = req.body

    // Check if the email already exists in bdd
    // TODO: Validate the request body
    // TODO: Hash the password
    // TODO: Save the user to the database

    console.log(email, name, password)
    res.send('User registered successfully')
  })

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
)
