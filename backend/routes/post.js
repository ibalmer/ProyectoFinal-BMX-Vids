import { Router } from "express";
import { PostController } from "../controllers/posts.js";

export const PostRouter = Router();

PostRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    const response = await PostController.GetByID(id);

    res.status(response.code).json(response);
});

PostRouter.post('/', async (req, res) => {
    const body = req.body;

    const response = await PostController.Post(body);

    res.status(response.code).json(response);
});

PostRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    console.log('body',body)
    const response = await PostController.UpdateByID(id, body);

    res.status(response.code).json(response);
});

PostRouter.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const response = await PostController.ModifyByID(id, body)

    res.status(response.code).json(response);
});

PostRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const response = await PostController.DeleteByID(id);

    res.status(response.code).json(response);
});
