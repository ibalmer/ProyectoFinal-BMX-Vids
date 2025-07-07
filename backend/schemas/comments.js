import { z } from 'zod';

export const commentSchema = z.object({
  user_id: z.number().int().positive(),       // FK al usuario
  post_id: z.number().int().positive(),       // FK al post
  content: z.string().min(1, 'El comentario no puede estar vacío').max(65535), // Tipo TEXT
});