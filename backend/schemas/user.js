import { z } from 'zod';

export const userSchema = z.object({
  user_name: z.string()
    .min(6, 'El nombre de usuario debe tener al menos 6 caracteres')
    .max(20, 'El nombre de usuario no puede tener más de 20 caracteres'),

  name: z.string()
    .min(2, 'El nombre debe tener al menos 6 caracteres')
    .max(20, 'El nombre no puede tener más de 20 caracteres'),

  last_name: z.string()
    .min(2, 'El apellido debe tener al menos 6 caracteres')
    .max(20, 'El apellido no puede tener más de 20 caracteres'),

  user_password: z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(20, 'La contraseña no puede tener más de 20 caracteres'),

  email: z.string().email('Email inválido'),

  user_type: z.enum(['user', 'admin']),
});
