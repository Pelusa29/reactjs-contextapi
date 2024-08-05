import { Router } from 'express'
import {
    getPost,
    creaPost,
    updatePost,
    deletePost,
    getPostById
} from '../controllers/post.controllers.js'
const router = Router()

//Define validation functions
import validateRes from '../helpers/validateHelper.js'
import validateId from '../helpers/validateParamsHelper.js'
import { createPostSchema } from '../schemas/post.js'

// Import validationAuth
import { authRequired } from '../helpers/validateToken.js'


router.get('/posts/user/:userId', authRequired, getPost)

router.post(
    '/posts/user',
    authRequired,
    validateRes(createPostSchema),
    creaPost)
router.put('/posts/:id', authRequired, validateRes(createPostSchema), updatePost)
router.delete('/posts/:id', authRequired, deletePost)

//router.get('/posts/:id', authRequired, getPostById)

export default router