import { Router } from "express";
import { UserController } from "../controllers/user.js"

export const UserRouter = Router();

UserRouter.get('/', async (req, res) => {
    const { filter, limit = 20, offset = 0} = req.query;
    let response;

    if (filter && typeof filter === 'string') {
        response = await UserController.GetByFilter(filter, parseInt(limit), parseInt(offset));
    } else {
        response = await UserController.Get(parseInt(limit), parseInt(offset));
    }

    res.status(response.code).json(response);
});

UserRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    const response = await UserController.GetByID(id);

    res.status(response.code).json(response);
});

UserRouter.post('/', async (req, res) => {
    const body = req.body;
    const response = await UserController.Post(body);

    res.status(response.code).json(response);
});

UserRouter.post('/login',async (req, res) => {
    const body = req.body;
    const response = await UserController.PostLogin(body)
    
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