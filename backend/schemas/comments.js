import { z } from 'zod';

export const commentSchema = z.object({
  user_id: z.number().int().positive(),   
  post_id: z.number().int().positive(),   
  content: z.string().min(1, 'El comentario no puede estar vacío').max(1000, 'El comentario no puede tener más de 1000 caracteres.'),
});