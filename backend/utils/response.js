export const CreateResponse = (method, resourse, data, total = null) => {
    let response;
    let errors = [];

    switch (method) {
        case 'GET':
            if (!data || data.length <= 0) {
                errors.push(`No se puede mostrar ${resourse}`);
                data = [];
            }
            response = {
                status: data.length > 0 ? 'ok' : 'not found',
                code: data.length > 0 ? 200 : 404,
                data,
                errors,
                ...(total !== null && { total }) 
            };
            break;


        case 'POST':

            if (!data) {
                errors.push(`No se pudo crear el ${resourse}`);
            }
            response = {
                status: data ? 'created' : 'bad request',
                code: data ? 201 : 400,
                data: data ? data : null,
                errors,
            }

            break;
        case 'PUT':

            if (data === null) {

                response = {
                    status: 'bad request',
                    code: 400,
                    data: null,
                    errors: [`No se pudo actualizar el ${resourse}`]
                }
                return response;
            } else if (data[0].changedRows == 0) {
                errors.push(`Datos ingresados en el ${resourse} duplicados`)
            }

            response = {
                status: data[0].affectedRows == 0 || data[0].changedRows == 0 ? 'bad request' : 'ok',
                code: data[0].affectedRows == 0 || data[0].changedRows == 0 ? 400 : 200,
                data,
                errors,
            }

            break;
        case 'PATCH':

            if (data === null) {

                response = {
                    status: 'bad request',
                    code: 400,
                    data: null,
                    errors: [`No se pudo modificar el ${resourse}`]
                }
                return response;
            } else if (data.changedRows == 0) {
                errors.push(`Datos ingresados en el ${resourse} duplicados`)
            }




            response = {
                status: data.affectedRows == 0 || data.changedRows == 0 ? 'bad request' : 'transformation applied',
                code: data.affectedRows == 0 || data.changedRows == 0 ? 400 : 214,
                data: data.affectedRows == 0 || data.changedRows == 0 ? null : data,
                errors,
            }

            break;

        case 'DELETE':

            if (data[0].affectedRows == 0) {
                errors.push(`No se pudo actualizar el ${resourse}`);
            }
            response = {
                status: data[0].affectedRows > 0 ? 'acepted' : 'bad request',
                code: data[0].affectedRows > 0 ? 202 : 400,
                data: data[0],
                errors
            }

            break;
        default:
            response = {
                status: 'Method Not Allowed',
                code: 405,
                errors: ["metodo no soportado"],
            };
            break;

    }

    return response;
};