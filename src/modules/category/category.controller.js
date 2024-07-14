import {Category} from '../../../db/index.js';


// Create a new category
export const createCategory = async (req, res,next) => {
    const {userId} = req.user
    const { name } = req.body;
        const category = new Category({ name, owner: userId });
        await category.save();
        res.status(201).json(category);
   
}



// Get all categories
export const getCategories = async (req, res,next) => {
        const { id } = req.params;
        const {userId}= req.user
        const category = await Category.findOne({ _id: id, owner: userId });
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        const categories = await Category.find({ owner: userId });
        res.status(200).json(categories);
   
};


// Update a category
export const updateCategory = async (req, res,next) => {
    const { id } = req.params;
    const { name } = req.body;
    
        const category = await Category.findOneAndUpdate({ _id: id, owner: userId }, { name }, { new: true });
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json(category);
    }


// Delete a category
export const deleteCategory = async (req, res,next) => {
    const { id } = req.params;
    const {userId}= req.user
    const category = await Category.findOneAndDelete({ _id: id, owner: userId });
    if (!category) {
        return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
}