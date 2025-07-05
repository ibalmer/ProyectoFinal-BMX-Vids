import { z } from "zod";

export const postSchema = z.object({
  title: z.string({ message: "El título debe ser un string." }),

  description: z.string({ message: "La descripción debe ser un string." }),

  content: z.string().min(20, { message: "El contenido debe tener al menos 20 caracteres." }),

  video_link: z.string({
    message: "El enlace de video debe ser una URL válida de YouTube.",
  }) , 

  tags: z.string({
    message: "Los tags deben ser un strig separados por , .",
  }).optional(),

  author: z.string({ message: "El autor debe ser un strig." }) ,

  user_id: z.number().int().positive({ message: "El ID de usuario debe ser un número entero positivo." }),

  type_id: z.number().int().positive({ message: "El ID de tipo de post debe ser un número entero positivo." })
  
});