import { z } from 'zod'

//validator
export const createPostSchema = z.object({
    title: z.string({
        required_error: 'Title is required',
    }).min(5, {
        message: 'Title must be at least 5 characters long'
    }).max(100, {
        message: 'Title must not exceed 100 characters'
    }).nonempty({
        message: 'Title cannot be empty'
    }),
    description: z.string({
        required_error: 'Description is required',
    }).min(10, {
        message: 'Description must be at least 10 characters long'
    }).nonempty({
        message: 'Description cannot be empty'
    }),
    url: z.string().optional(true)
})
