import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import predictRoutes from './routes/predict.routes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(helmet())

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true,
}))

app.use(express.json({ limit: '10kb' }))
app.use(morgan('dev'))

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() })
})

app.use('/api/predict', predictRoutes)

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err.message)
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
