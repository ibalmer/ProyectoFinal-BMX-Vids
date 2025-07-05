import { PostModel } from "../models/posts.js";
import { postSchema } from "../schemas/post.js";
import { CreateResponse } from "../utils/response.js";

export class PostController {

    static async Get(limit = 10, offset = 0) {
        const { posts, total } = await PostModel.Get(limit, offset);
        return CreateResponse('GET', 'post', posts ?? [], total);
    }

    static async GetByCategory(category, limit = 10, offset = 0) {
        try {
            const { posts, total } = await PostModel.GetByCategory(category, limit, offset);
            return CreateResponse('GET', 'post', posts ?? [], total);
        } catch (error) {
            console.error('Error al obtener post por categoría:', error);
            return CreateResponse('GET', 'post', [], 0);
        }
    }

    static async GetByFilter(filter, limit = 10, offset = 0) {
        const { results, total } = await PostModel.GetByFilter(filter, limit, offset);
        return CreateResponse('GET', 'post', results ?? [], total);
    }


    static async GetByID(id) {
        let response;
        try {
            const data = await PostModel.GetByID(id)
            response = CreateResponse('GET', 'post', data);
        } catch (error) {
            console.error('Error al obtener post por ID:', error);
            response = CreateResponse('GET', 'post', null)
        }

        return response;
    }

    static async Post(data) {

        const validationBody = postSchema.safeParse(data);

        if (!validationBody.success) {

            return CreateResponse('POST', 'post', null);
        }

        const body = await PostModel.Post(data);

        return CreateResponse('POST', 'post', body);
    }

    static async UpdateByID(id, body) {

        const post = await PostModel.GetByID(id);
        const bodyPost = post[0];

        const newPost = { ...bodyPost, ...body }
        console.log('controlador', newPost)
        const validationBody = postSchema.safeParse(newPost)

        const postCompared =
            bodyPost && newPost &&
            Object.keys(bodyPost).length === Object.keys(newPost).length &&
            Object.keys(bodyPost).every((key, index) => key === Object.keys(newPost)[index]);

        if (!validationBody.success || !postCompared) {
            return CreateResponse('PUT', 'post', null)
        } else {
            const data = await PostModel.UpdateByID(id, body)
            return CreateResponse('PUT', 'post', data)
        }

    }

    static async ModifyByID(id, body) {

        const post = await PostModel.GetByID(id);
        const bodyPost = post[0];

        const newPost = { ...bodyPost, ...body }

        const validationBody = postSchema.safeParse(newPost)

        const postCompared =
            bodyPost && newPost &&
            Object.keys(bodyPost).length === Object.keys(newPost).length &&
            Object.keys(bodyPost).every((key, index) => key === Object.keys(newPost)[index]);

        if (!validationBody.success || !postCompared) {

            return CreateResponse('PATCH', 'post', null)
        } else {
            const data = await PostModel.ModifyByID(id, body)
            return CreateResponse('PATCH', 'post', data)
        }

    }
    static async DeleteByID(id) {

        let response;

        const data = await PostModel.DeleteByID(id)

        return response = CreateResponse('DELETE', 'post', data);
    }
};