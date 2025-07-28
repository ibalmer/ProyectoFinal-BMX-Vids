import { CommentsModel } from "../models/comments.js";
import { commentSchema } from '../schemas/comments.js';
import { CreateResponse } from "../utils/response.js";

export class CommentsController {
    static async GetByID(id) {
        const [rows] = await connection.query(
            `SELECT * FROM comment WHERE id = ?`,
            [id]
        );
        return rows;
    }
    static async GetByPostID(postID) {
        let response;
        try {
            const data = await CommentsModel.GetByPostID(postID)
            response = CreateResponse('GET', 'comentarios', data)
        } catch (error) {
            console.error('Error al obtener los comentarios', error)
            response = CreateResponse('GET', 'comentarios', null)
        }
        return response;
    }
    static async Post(data) {
        const validationBody = commentSchema.safeParse(data);
        if (!validationBody.success) {
            const body = {
                status: 'bad request',
                code: 400,
                data: [],
                errors: 'No se pudo publicar el comentario'
            }
            return CreateResponse('POST', 'comentario', body);
        }
        const response = await CommentsModel.Post(data);
        const body = {
            status: 'created',
            code: 201,
            data: response,
            errors: []
        }
        return CreateResponse('POST', 'comentario', body);
    }
    static async UpdateByID(id, body) {
        const comment = await CommentsModel.GetByID(id);
        const bodyComment = comment[0];
        const newComment = { ...bodyComment, ...body };
        const validationBody = commentSchema.safeParse(newComment);
        const commentCompared =
            bodyComment && newComment &&
            Object.keys(bodyComment).length === Object.keys(newComment).length &&
            Object.keys(bodyComment).every((key, index) => key === Object.keys(newComment)[index]);

        if (!validationBody.success || !commentCompared) {
            return CreateResponse('PUT', 'comentario', null);
        } else {
            const data = await CommentsModel.UpdateByID(id, body);
            return CreateResponse('PUT', 'comentario', data);
        }
    }
    static async ModifyByID(id, body) {
        const comment = await CommentsModel.GetByID(id);
        const bodyComment = comment[0];
        const newComment = { ...bodyComment, ...body };
        const validationBody = commentSchema.safeParse(newComment);
        const commentCompared =
            bodyComment && newComment &&
            Object.keys(bodyComment).length === Object.keys(newComment).length &&
            Object.keys(bodyComment).every((key, index) => key === Object.keys(newComment)[index]);

        if (!validationBody.success || !commentCompared) {
            return CreateResponse('PATCH', 'comentario', null);
        } else {
            const data = await CommentsModel.ModifyByID(id, body);
            return CreateResponse('PATCH', 'comentario', data);
        }
    }
    static async DeleteByID(id) {
        let response;
        const data = await CommentsModel.DeleteByID(id)
        return response = CreateResponse('DELETE', 'comentario', data);
    }

}

