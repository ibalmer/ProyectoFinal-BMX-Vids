import { Router } from "express";
import { UserController } from "../controllers/user.js"
import jwt from 'jsonwebtoken';


export const UserRouter = Router();

UserRouter.get('/', async (req, res) => {
    const { filter, limit = 20, offset = 0 } = req.query;
    let response;

    if (filter && typeof filter === 'string') {
        response = await UserController.GetByFilter(filter, parseInt(limit), parseInt(offset));
    } else {
        response = await UserController.Get(parseInt(limit), parseInt(offset));
    }

    res.status(response.code).json(response);
});

UserRouter.post('/register', async (req, res) => {
    const body = req.body;
    const response = await UserController.Post(body);

    res.status(response.code).json(response);
});

UserRouter.post('/login', async (req, res) => {
    const body = req.body;
    const response = await UserController.PostLogin(body)
    
    if (response.status != "unauthorized") {
        const user = response.data
        const token = jwt.sign({ id: user.id, user_type: user.user_type }, process.env.SECRET_KEY_JWT, { expiresIn: '72h' });

        res.cookie('user_token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 72
        })

        const { user_type, ...cleanedData } = response.data;

        const cleanedResponse = {
            ...response,
            data: cleanedData
        };
        res.status(response.code).json(cleanedResponse);
    } else {

    }

});

UserRouter.get('/auth', async (req, res) => {
    const token = req.cookies.user_token;

    if (!token) {
        res.status(401).json({ error: 'Unauthorized'});
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT);
        res.json({ data: decoded });
    } catch (err) {
        res.status(401).json({ error: 'Incorrect Secret Key' });
    }
});

UserRouter.post('/closeSession', (req, res) => {
    res.clearCookie('user_token');
    res.json({message: 'Close Session!'});
});

UserRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    const response = await UserController.GetByID(id);

    res.status(response.code).json(response);
});

UserRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const response = await UserController.UpdateByID(id, body);

    res.status(response.code).json(response);
});

UserRouter.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const response = await UserController.ModifyByID(id, body)

    res.status(response.code).json(response);
});

UserRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const response = await UserController.DeleteByID(id);

    res.status(response.code).json(response);
});

