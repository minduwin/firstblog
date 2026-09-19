import { Router } from 'express';
import blogControl from '../controllers/blogControl.js';

const blogRouter = Router();

blogRouter.get('/', blogControl.indexPage);

export default blogRouter;
