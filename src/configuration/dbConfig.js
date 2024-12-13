import mongoose from "mongoose";
import 'dotenv/config'

const DB_NAME="todo"
const connectDB= async () => {
    try {
        const conncetionInstance= await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`database connected \n db host ${conncetionInstance.connection.host}`)
    } catch (error) {
        console.log("database connection failed",error);
        process.exit(1) 
    }
}

export default connectDB;
