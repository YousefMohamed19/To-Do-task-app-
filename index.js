import express from 'express';
import jwt from 'jsonwebtoken';
import { connectDB } from './db/connection.js';
import {authRouter, categoryRouter, taskRouter} from './src/index.js';
import { globalErrorHandler } from './src/middleware/asyncHandler.js';
import { User } from './db/index.js';


const app = express();
const PORT = 3000;

app.use(express.json());
connectDB()

app.use('/auth',authRouter)
app.use('/categories', categoryRouter);
app.use('/tasks', taskRouter);

app.get('/auth/verify-email/:token', async(req, res,next) => {

    const { token } = req.params
    const payload = jwt.verify(token,'yousefBondok')
    if(payload.email){
        await User.findOneAndUpdate({email:payload.email},{verifyEmail:true})}
    return res.status(200).json({message:'Email verified successfully'})
    })

    // call global error handler
    app.use(globalErrorHandler)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


