//Import Models
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'

//#region Registro
export const register = async (req, res) => {
    const { username, email, password } = req.body

    try {

        //Find the user
        const userFounded = await User.findOne({ email })
        if (userFounded) return res.status(400).json(['The email is already in use'])

        //Hash the password
        const passwordHash = await bcryptjs.hash(password, 10)
        //Instance of User as Object
        const newUser = new User({
            username,
            email,
            password: passwordHash
        })
        /* console.log(newUser) */
        await newUser
            .save()
            .then(async (user) => {
                //Save Token in the session
                const token = await createAccessToken({ id: user._id })
                res.cookie('token', token)
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
    const { email, password } = req.body

    try {
        //Find the user
        const userFounded = await User.findOne({ email })

        if (!userFounded) return res.status(400).json(['User not found'])

        //Compare the password
        const passwordComparesMatched = await bcryptjs.compare(password, userFounded.password)
        if (!passwordComparesMatched) return res.status(400).json(['Password not matched'])

        const token = await createAccessToken({ id: userFounded._id })
        res.cookie('token', token, {
            httpOnly: false,
            secure: true,
            maxAge: 3600000
        })

        res.status(200).json({
            message: 'User logged in successfully',
            id: userFounded._id,
            username: userFounded.username,
            email: userFounded.email,
            token
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
//#endregion


//#region Logout
export const logout = (req, res) => {
    res.clearCookie('token')
    res.status(200).json({
        message: 'User logged out successfully'
    })
    res.end()
}
//#endregion