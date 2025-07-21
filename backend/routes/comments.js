import { Router } from "express";
import { CommentsController } from '../controllers/comments.js';

export const CommentsRouter = Router();

CommentsRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    const response = await CommentsController.GetByID(id)

    res.status(response.code).json(response);
});

CommentsRouter.get('/post/:id', async (req, res) => {
    const { id } = req.params;

    const response = await CommentsController.GetByPostID(id)

    res.status(response.code).json(response);
});

CommentsRouter.post('/', async (req, res) => {
    const body = req.body;

    const response = await CommentsController.Post(body);

    res.status(response.code).json(response);
});

CommentsRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const response = await CommentsController.UpdateByID(id, body);

    res.status(response.code).json(response);
});

CommentsRouter.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const response = await CommentsController.ModifyByID(id, body)

    res.status(response.code).json(response);
});

CommentsRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const response = await CommentsController.DeleteByID(id)

    res.status(response.code).json(response);
});
