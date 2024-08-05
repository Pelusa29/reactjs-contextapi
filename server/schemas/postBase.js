import { z } from 'zod'

export const findAndDelete = z.object({
    id: z.string({
        required_error: 'Id is required',
    })
}) 