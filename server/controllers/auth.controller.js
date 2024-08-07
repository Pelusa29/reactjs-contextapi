//Import Models
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import { createAccessToken, verifyAccessToken } from '../libs/jwt.js'
import {
    TOKEN_SECRET
} from '../config/enviroments.js'

//#region Registro
export const register = async (req, res) => {
    const { username, email, password } = req.body
    const errors = []
    try {

        //Find the user
        const userFounded = await User.findOne({ email })
        if (userFounded) return res.status(400).json(['User already exists'])//errors.push('User already exists')


        //if (errors.length > 0) return res.status(400).json({ errors })

        //Hash the password
        const passwordHash = await bcryptjs.hash(password, 10)
        //Instance of User as Object
        const newUser = new User({
            username,
            email,
            password: passwordHash
        })
        console.log(newUser)
        await newUser
            .save()
            .then(async (user) => {
                //Save Token in the session
                const token = await createAccessToken({ id: user._id })
                console.log(`Token Back Generado:${token}`)
                res.cookie('name', 'Probando')
                res.cookie('userId', user._id)
                res.cookie('token', token, {
                    httpOnly: false,
                    secure: false,
                    maxAge: 7 * 24 * 60 * 60 * 1000
                })

                res.status(200).json({
                    message: 'User created successfully',
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    token
                })
            })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
//#endregion

//#region Login
export const login = async (req, res) => {
    const { username, password } = req.body

    try {
        //Find the user
        const userFounded = await User.findOne({ username })
        console.log(userFounded)
        if (!userFounded) return res.status(400).json(['User not found'])

        const passwordComparesMatched = await bcryptjs.compare(password, userFounded.password)
        if (!passwordComparesMatched) return res.status(400).json(['Password not matched'])

        console.log(userFounded._id)

        const token = await createAccessToken({ id: userFounded._id })
        res.cookie('name', 'Probando')
        res.cookie('userId', userFounded._id)
        res.cookie('token', token, {
            httpOnly: false,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            message: 'User logged in successfully',
            id: userFounded._id,
            username: userFounded.username,
            email: userFounded.email,
            token
        })
    } catch (error) {
        res.status(403).json([error.message])
        /*  res.status(500).json({
             error: error.message
         }) */
    }
}
//#endregion


//#region Logout
export const logout = (req, res) => {
    res.clearCookie('token')
    res.clearCookie('userId')
    res.clearCookie('name')
    res.status(200).json({
        message: 'User logged out successfully'
    })
    res.end()
}
//#endregion


//#region verifyToken
export const verifyToken = async (req, res) => {
    //console.log(`Title and Token: ${req.cookies.name}`)
    //console.log(`userId: ${req.cookies.userId}`)
    try {

        const token = req.cookies.token

        if (!token) return res.status(400).json({ message: 'No token provided' })


        const refreshToken = jwt.verify(token, TOKEN_SECRET)
        console.log(`userId: ${req.cookies.userId}`)

        const userFounded = await User.findById(req.cookies.userId)
        if (!userFounded) return res.status(400).json(['User not found'])

        res.status(200).json({
            message: 'Token verified',
            id: userFounded._id,
            username: userFounded.username,
            email: userFounded.email
        })

    } catch (error) {
        res.status(403).json({ message: 'Token is not valid' })
    }
}