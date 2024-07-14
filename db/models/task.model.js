import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Text', 'List'],
        required: true
    },
    body: {
        type: String,
        required: true
    },
    items: [{
        type: String
    }],
    shared: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
       
        ref: 'User'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
    
        ref: 'Category'
    },
    categoryName: {
        type: String
    }
}, {
    timestamps: true
});

export const Task = mongoose.model('Task', taskSchema);


