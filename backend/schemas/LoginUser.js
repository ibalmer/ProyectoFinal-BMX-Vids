import { z } from 'zod'

export const LoginUserSchema = z.object({
    email: z.string().email('Email inválido'),
    user_password: z.string().min(1, 'Ingresa la contraseña.')
});