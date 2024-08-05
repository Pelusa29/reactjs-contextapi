import jsonwebtoken from "jsonwebtoken"
import {
    TOKEN_SECRET
} from "../config/enviroments.js"

export const authRequired = (req, res, next) => {

    // Check if the request has the cookie "token" in it
    if (!req.cookies) return res.status(401).json({ message: 'Authentication required' })
    const token = req.cookies['token']

    if (!token) return res.status(401).json({ message: "No token provided" })

    try {
        jsonwebtoken.verify(token, TOKEN_SECRET, (err, user) => {
            if (err) return res.status(400).json({ message: 'Forbidden' })
            req.user = user
            next()
        })
    } catch (error) {
        return res.status(401).json({ message: "Invalid token", error: error.message })
    }
}