import { z } from "zod";

export const postSchema = z.object({
  title: z.string({ message: "El título debe ser un string." }).min(20, { message: "El contenido debe tener al menos 6 caracteres." }),

  description: z.string({ message: "La descripción debe ser un string." }).min(20, { message: "El contenido debe tener al menos 6 caracteres." }),

  content: z.string().min(20, { message: "El contenido debe tener al menos 20 caracteres." }),

  video_link: z.string({
    required_error: "El enlace de video no puede estar vacío.",
    invalid_type_error: "El enlace de video debe ser un string."
  }).refine((url) => {
    try {
      const parsed = new URL(url);
      return (
        parsed.hostname === "www.youtube.com" ||
        parsed.hostname === "youtube.com" ||
        parsed.hostname === "youtu.be"
      );
    } catch (e) {
      return false;
    }
  }, {
    message: "El enlace de video debe ser una URL válida de YouTube."
  }),

  tags: z.string({
    message: "Los tags deben ser un string separados por , .",
  }).min(2, { message: "El contenido debe tener al menos 2 caracteres." }).optional(),

  author: z.string({ message: "El autor debe ser un string." }),

  user_id: z.number().int().positive({ message: "El ID de usuario debe ser un número entero positivo." }),

  type_id: z.number().int().positive({ message: "El ID de tipo de post debe ser un número entero positivo." })
});

