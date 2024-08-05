import { z } from 'zod';

//#region Register Schema
export const registerSchema = z.object({
    username: z.string({
        required_error: 'Username is required'
    }),
    email: z.string({
        required_error: 'Email is required'
    }).email({
        message: 'Invalid email format'
    }),
    password: z.string({
        required_error: 'Password is required'
    }).min(6, {
        message: 'Password must be at least 6 characters'
    })
});
//#endregion

//#region login Schema
export const loginSchema = z.object({
    email: z.string({
        required_error: 'Email is required'
    }).email({
        message: 'Invalid email address'
    }),
    password: z.string({
        required_error: 'Password is required'
    }).min(6, {
        message: 'Password must be at least 6 characters'
    })
});
//#endregion