import { Router } from 'express';
import { createCategory, getCategories, updateCategory, deleteCategory } from '../category/category.controller.js';
import {auth} from '../../middleware/authentication.js';
import { validate } from '../../middleware/validation.js';
import { categoryVal } from './category.validation.js';
import { asyncHandler } from '../../middleware/asyncHandler.js';

export const categoryRouter = Router();

categoryRouter.post('/', auth,validate(categoryVal), asyncHandler(createCategory));
categoryRouter.get('/get/:id', auth, asyncHandler(getCategories));
categoryRouter.put('/update/:id', auth, validate(categoryVal),asyncHandler(updateCategory));
categoryRouter.delete('/delete/:id', auth, asyncHandler(deleteCategory));


