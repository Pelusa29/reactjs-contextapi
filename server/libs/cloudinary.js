import { v2 as cloudinary } from 'cloudinary'
import {
    CLOUDINARY_NAME,
    CLOUDINARY_API_SECRET,
    CLOUDINARY_API_KEY
} from '../config/enviroments.js'

cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
})

export const uploadImage = async filePath => {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'imageBooks',
        width: 1200,
        height: 800,
        crop: 'limit',
        quality: 100
    })
}

export const deleteImage = async publicId => {
    return await cloudinary.uploader.destroy(publicId)
}