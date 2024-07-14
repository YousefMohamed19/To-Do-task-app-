import {Task} from '../../../db/index.js';


// create task
export const createTask = async (req, res,next) => {
    const { type, body, items, shared,categoryName } = req.body;
    const {userId} = req.user;
    const {categoryId} = req.params
        const task = new Task({
            type,
            body,
            items,
            shared,
            owner: userId,
            sharedWith: [userId],
            categoryName,
            categoryId
        });
        await task.save();
        res.status(201).json({message:"Task created",task});
    }

    
 // Get all tasks with filtering and sorting and pagination
export const getTasks = async (req, res,next) => {
    const { userId } = req.user;
    const { type, body, items, shared, category, sortBy, sortOrder = 'asc', page = 1, limit = 10 } = req.query;
    const query = { owner: userId };

    if (type) {
        query.type = type;
    }
    if (body) {
        query.body = body;
    }
    if (items) {
        query.items = items;
    }
    if (shared) {
        query.shared = shared;
    }
    if (category) {
        query.category = category;
    }

    const sortOptions = {};
    if (sortBy) {
        sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;
    }

    const skip = (page - 1) * limit;

    try {
        const tasks = await Task.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(parseInt(limit))
            .populate('category', 'categoryName');

        const totalTasks = await Task.countDocuments(query);

        res.status(200).json({ 
            tasks, 
            totalPages: Math.ceil(totalTasks / limit), 
            currentPage: parseInt(page) 
        });
    } catch (error) {
        next(error);
    }
}








// get task by id

export const getTaskById = async (req, res,next) => {
    const { userId } = req.user;
    const { id } = req.params;
    const task = await Task.findOne({ _id: id, owner: userId });
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ task });
}


// Update task

export const updateTask = async (req, res,next) => {
    const {userId}=req.user
    const { id } = req.params;
    const { type, body, items, shared, categoryName } = req.body;
        const task = await Task.findOneAndUpdate(
            { _id: id, owner: userId },
            { type, body, items, shared,  categoryName },
            { new: true }
        );
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json({ message: 'Task updated', task });
} 

// Delete task

export const deleteTask = async (req, res,next) => {
    const { userId } = req.user;
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id, owner: userId });
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted' });
}