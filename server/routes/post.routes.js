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
import { findAndDelete } from '../schemas/postBase.js'


router.get('/posts', getPost)

router.post('/posts', validateRes(createPostSchema), creaPost)

router.put('/posts/:id', validateRes(createPostSchema), updatePost)

router.delete('/posts/?:id', deletePost)

router.get('/posts/:id', getPostById)

export default router