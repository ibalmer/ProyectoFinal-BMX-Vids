import { UserModel } from "../models/user.js"
import { userSchema } from "../schemas/user.js";
import { CreateResponse } from "../utils/response.js";

export class UserController {

    static async Get(limit = 10, offset = 0) {
        const { users, total } = await UserModel.Get(limit, offset);
        return CreateResponse('GET', 'user', users ?? [], total);
    }


    static async GetByFilter(filter, limit = 10, offset = 0) {
        const { results, total } = await UserModel.GetByFilter(filter, limit, offset);
        return CreateResponse('GET', 'user', results ?? [], total);
    }


    static async GetByID(id) {
        let response;
        try {
            const data = await UserModel.GetByID(id)
            response = CreateResponse('GET', 'user', data);
        } catch (error) {
            console.error('Error al obtener post por ID:', error);
            response = CreateResponse('GET', 'user', null)
        }

        return response;
    }

    static async Post(data) {

        const validationBody = userSchema.safeParse(data);
        console.log(validationBody.success)
        if (!validationBody.success) {

            return CreateResponse('POST', 'user', null);
        }

        const body = await UserModel.Post(data);

        return CreateResponse('POST', 'user', body);
    }

    static async PostLogin(data) {

        const dbUser = await UserModel.GetByEmail(data.email)

        if (data.user_password === dbUser[0].user_password) {
            const loginUser = {
                user_name:dbUser[0].user_name,
                name:dbUser[0].name,
                last_name:dbUser[0].last_name,
                email:dbUser[0].email,
                user_type:dbUser[0].user_type
            }

            return CreateResponse('POST', 'user', loginUser)
            
        } else { return CreateResponse('POST', 'user', null)}

    }

    static async UpdateByID(id, body) {

        const user = await UserModel.GetByID(id);
        console.log('controlador', user)
        const bodyUser = user[0];

        const newUser = { ...bodyUser, ...body }
        console.log('controlador', newUser)
        const validationBody = userSchema.safeParse(newUser)

        const userCompared =
            bodyUser && newUser &&
            Object.keys(bodyUser).length === Object.keys(newUser).length &&
            Object.keys(bodyUser).every((key, index) => key === Object.keys(newUser)[index]);
        if (!validationBody.success || !userCompared) {
            return CreateResponse('PUT', 'user', null)
        } else {
            const data = await UserModel.UpdateByID(id, body)
            return CreateResponse('PUT', 'user', data)
        }

    }

    static async ModifyByID(id, body) {

        const user = await UserModel.GetByID(id);
        const bodyUser = user[0];
        const newUser = { ...bodyUser, ...body }
        const validationBody = userSchema.safeParse(newUser)
        console.log(validationBody.success)

        const userCompared =
            bodyUser && newUser &&
            Object.keys(bodyUser).length === Object.keys(newUser).length &&
            Object.keys(bodyUser).every((key, index) => key === Object.keys(newUser)[index]);

        if (!validationBody.success || !userCompared) {

            return CreateResponse('PATCH', 'user', null)
        } else {
            const data = await UserModel.ModifyByID(id, body)
            return CreateResponse('PATCH', 'user', data)
        }

    }
    static async DeleteByID(id) {

        let response;

        const data = await UserModel.DeleteByID(id)

        return response = CreateResponse('DELETE', 'user', data);
    }
};