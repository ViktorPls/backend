import { app, PORT } from './configs.js'
import authRoutes from './routes/authRoutes.js'

app.use('/auth', authRoutes)

app.get('/', (req, res) => res.sendFile('views/index.html', { root: '.' }))

app.get('/protected', (req, res) => {
  res.json({ msg: 'ruta protegida' })
})

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
)
