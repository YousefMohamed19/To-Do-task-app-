import mongoose from "mongoose";
export const connectDB = () => {
  mongoose.connect('mongodb://localhost:27017/taskEvent').then(() => {
    console.log('db connected successfully');
  })
    .catch((err) => {
      console.log("failed to connect db", err);
    });
}
