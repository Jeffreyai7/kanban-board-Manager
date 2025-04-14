
import { z } from 'zod'


export const signUpSchema = z.object({
    fName: z.string().min(3),
    lName: z.string().min(3),
    address: z.string().min(3),
    state: z.string().min(3),
    country: z.string().min(3),
    phoneNumber: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6)
})

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)

})