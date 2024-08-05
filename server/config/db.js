import mongoose from "mongoose"
import { connectDTB } from "./enviroments.js"

// Connect to MongoDB
export const connectDB = async () => {
    try {
        console.log(">>> DB EXECUTE")
        mongoose.set("strictQuery", false)
        const connected = await mongoose.connect(connectDTB)
        console.log(`Mongodb Connected ${(connected).connection.name}`)
        console.log(">>> DB is connected")
    } catch (error) {
        console.error('Error: ', error)
        process.exit(1)
    }
}