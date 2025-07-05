import { Router } from "express";
import { PostController } from "../controllers/posts.js";

export const PostsRouter = Router();

PostsRouter.get('/', async (req, res) => {
    const { filter, limit = 10, offset = 0 } = req.query;
    let response;

    if (filter && typeof filter === 'string') {
        response = await PostController.GetByFilter(filter, parseInt(limit), parseInt(offset));
    } else {
        response = await PostController.Get(parseInt(limit), parseInt(offset));
    }

    res.status(response.code).json(response);
});

PostsRouter.get('/:category', async (req, res) => {
    const { limit = 10, offset = 0 } = req.query;
    const { category } = req.params;
    
    const response = await PostController.GetByCategory(category, parseInt(limit), parseInt(offset));
    
    res.status(response.code).json(response);

});



