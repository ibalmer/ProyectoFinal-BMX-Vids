import bcrypt from 'bcrypt';
import { UserModel } from "../models/user.js"
import { LoginUserSchema } from '../schemas/loginUser.js';
import { userSchema } from "../schemas/user.js";
import { CreateResponse } from "../utils/response.js";

export class UserController {
    static async Get(limit = 10, offset = 0) {
        const { users, total } = await UserModel.Get(limit, offset);
        return CreateResponse('GET', 'usuario', users ?? [], total);
    }
    static async GetByFilter(filter, limit = 10, offset = 0) {
        const { results, total } = await UserModel.GetByFilter(filter, limit, offset);
        return CreateResponse('GET', 'usuario', results ?? [], total);
    }
    static async GetByID(id) {
        let response;
        try {
            const data = await UserModel.GetByID(id)
            response = CreateResponse('GET', 'usuario', data);
        } catch (error) {
            console.error('Error al obtener usuario por ID:', error);
            response = CreateResponse('GET', 'usuario', null)
        }
        return response;
    }
    static async Post(data) {
        const validationBody = userSchema.safeParse(data);
        if (!validationBody.success) {
            return CreateResponse('POST', 'usuario', null, validationBody.error);
        }
        try {
            const response = await UserModel.Post(data);

            const body = {
                status: 'created',
                code: 201,
                data: response,
                errors: []
            };
            return CreateResponse('POST', 'user', body);
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                let field = 'dato';

                // Verificamos qué campo fue duplicado
                if (error.message.includes("'email'")) {
                    field = 'email';
                } else if (error.message.includes("'username'")) {
                    field = 'nombre de usuario';
                }
                const body = {
                    status: 'conflict',
                    code: 409,
                    data: [],
                    errors: `El ${field} ya está registrado`
                };
                return CreateResponse('POST', 'usuario', body);
            }
            console.error('Error al crear usuario:', error);
            const body = {
                status: 'error',
                code: 500,
                data: [],
                errors: 'Error interno del servidor'
            };
            return CreateResponse('POST', 'usuario', body);
        }
    }
    static async PostLogin(data) {
        const dbUser = await UserModel.GetByEmail(data.email);
        const validationBody = LoginUserSchema.safeParse(data);
        if (!validationBody.success) {
            return CreateResponse('POST', 'usuario', null, validationBody.error);
        };

        if (!dbUser || dbUser.length === 0) {
            const errors = [{email: 'El email no existe'}];
            return CreateResponse('POST', 'usuario', null, errors);
        }
        const isValid = await bcrypt.compare(data.user_password, dbUser[0].user_password);
        if (!isValid) {
            const errors = [{user_password: 'La contraseña es incorrecta'}];
            return CreateResponse('POST', 'usuario', null, errors);
        }
        const loginUser = {
            id: dbUser[0].id,
            user_name: dbUser[0].user_name,
            name: dbUser[0].name,
            last_name: dbUser[0].last_name,
            email: dbUser[0].email,
            user_type: dbUser[0].user_type
        };
        const body = {
            status: 'ok',
            code: 200,
            data: loginUser,
            errors: []
        };
        return CreateResponse('POST', 'usuario', body);
    }
    static async UpdateByID(id, body) {
        const user = await UserModel.GetByID(id);
        const bodyUser = user[0];
        const newUser = { ...bodyUser, ...body }
        const validationBody = userSchema.safeParse(newUser)
        const userCompared =
            bodyUser && newUser &&
            Object.keys(bodyUser).length === Object.keys(newUser).length &&
            Object.keys(bodyUser).every((key, index) => key === Object.keys(newUser)[index]);
        if (!validationBody.success || !userCompared) {
            return CreateResponse('PUT', 'usuario', null, validationBody.error)
        } else {
            const data = await UserModel.UpdateByID(id, body)
            return CreateResponse('PUT', 'usuario', data)
        }
    }
    static async ModifyByID(id, body) {
        const user = await UserModel.GetByID(id);
        const bodyUser = user[0];
        const newUser = { ...bodyUser, ...body }
        const validationBody = userSchema.safeParse(newUser)
        const userCompared =
            bodyUser && newUser &&
            Object.keys(bodyUser).length === Object.keys(newUser).length &&
            Object.keys(bodyUser).every((key, index) => key === Object.keys(newUser)[index]);

        if (!validationBody.success || !userCompared) {
            return CreateResponse('PATCH', 'usuario', null, validationBody.error)
        } else {
            const data = await UserModel.ModifyByID(id, body)
            return CreateResponse('PATCH', 'usuario', data)
        }
    }
    static async DeleteByID(id) {
        let response;
        const data = await UserModel.DeleteByID(id)
        return response = CreateResponse('DELETE', 'usuario', data);
    }
};