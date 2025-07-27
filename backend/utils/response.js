const formatValidationErrors = (zodError) => {
    const errors = [];
    if (zodError.errors) {
        zodError.errors.forEach((error) => {
            console.log(error)
            const field = error.path.join(".");
            errors.push({ [field]: error.message });
        });
    }
    return errors;
};

export const CreateResponse = (
    method,
    resource,
    data,
    validationErrors = null,
    total=null
) => {
    let response;
    let errors = [];

    // Process validation errors if they exist
    if (validationErrors) {
        errors = formatValidationErrors(validationErrors);
    }

    switch (method) {
        case 'GET':
            if (!data || data.length <= 0) {
                errors.push(`No se puede mostrar ${resource}`);
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
            console.log('data create response:', data)
            // If there are validation errors, return bad request
            if (validationErrors) {
                response = {
                    status: 'bad request',
                    code: 400,
                    data: null,
                    errors
                };
            } else {
                response = {
                    status: data.status,
                    code: data.code,
                    data: data.data,
                    errors: data.errors
                };
            }
            console.log('response createresponse:', response)
            break;

        case 'PUT':
            // If there are validation errors, return bad request
            if (validationErrors) {
                response = {
                    status: 'bad request',
                    code: 400,
                    data: null,
                    errors
                };
            } else {
                response = {
                    status: 'ok',
                    code: 200,
                    data,
                    errors,
                };
            }
            break;

        case 'PATCH':
            // If there are validation errors, return bad request
            if (validationErrors) {
                response = {
                    status: 'bad request',
                    code: 400,
                    data: null,
                    errors
                };
            } else {
                response = {
                    status: 'transformation applied',
                    code: 214,
                    data: data,
                    errors,
                };
            }
            break;

        case 'DELETE':
            // If there are validation errors, return bad request
            if (validationErrors) {
                response = {
                    status: 'bad request',
                    code: 400,
                    data: null,
                    errors
                };
            } else {
                response = {
                    status: 'acepted',
                    code: 202,
                    data: data[0],
                    errors
                };
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