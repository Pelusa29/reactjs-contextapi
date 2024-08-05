import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import fileUpload from 'express-fileupload'
import cookieParser from 'cookie-parser'
import cors from 'cors'

//#region Routes Imported
import authRoutes from './routes/auth.routes.js'
import postRoutes from './routes/post.routes.js'
//#endregion
const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

// Bodyparser middleware to parse JSON and URL-encoded data
app.use(morgan('dev')) // log requests to the console
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
// Service to upload Files
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './fileBooks'
}))

// middlewares

// Routes
app.use('/api/', authRoutes)
app.use('/api/', postRoutes)
export default app