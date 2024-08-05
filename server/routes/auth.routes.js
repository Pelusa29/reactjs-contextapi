//import express Route to create a new router
import { Router } from 'express';
import {
    register,
    logout,
    login,
} from '../controllers/auth.controller.js'
import { authRequired } from '../helpers/validateToken.js';
import { registerSchema, loginSchema } from '../schemas/auth.js'
import validateRes from '../helpers/validateHelper.js'

const router = Router()


//#region Main routes system
router.post('/register', validateRes(registerSchema), register)
router.post('/login', validateRes(loginSchema), login)
router.post('/logout', logout)

//router.get('/verify-token', verifyToken)
//#endregion



export default router