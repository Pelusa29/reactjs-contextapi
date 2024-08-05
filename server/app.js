import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import fileUpload from 'express-fileupload'

//#region Routes Imported
import postRoutes from './routes/post.routes.js'
//#endregion
const app = express()

// Bodyparser middleware to parse JSON and URL-encoded data
app.use(morgan('dev')) // log requests to the console
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// Service to upload Files
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './fileBooks'
}))

// middlewares

// Routes
app.use(postRoutes)
export default app