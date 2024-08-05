import dotenv from 'dotenv'
dotenv.config()

export const connectDTB = process.env.MONGO_URL
export const PORT = process.env.PORT
export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET