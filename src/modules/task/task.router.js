import { Router } from 'express';
import { createTask, getTasks, updateTask, deleteTask, getTaskById } from '../task/task.controller.js';
import {auth} from '../../middleware/authentication.js';
import { asyncHandler } from '../../middleware/asyncHandler.js';
import { taskValidation } from './task.validation.js';
import { validate } from '../../middleware/validation.js';
export const taskRouter = Router();

taskRouter.post('/create/:categoryId', auth,validate(taskValidation), asyncHandler(createTask));
taskRouter.get('/', auth, asyncHandler(getTasks));
taskRouter.get('/:id', auth, asyncHandler(getTaskById));
taskRouter.put('/upadate/:id', auth,validate(taskValidation), asyncHandler(updateTask));
taskRouter.delete('/delete/:id', auth, asyncHandler(deleteTask));


