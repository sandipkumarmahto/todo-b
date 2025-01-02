import mongoose, { mongo, Schema } from "mongoose";
import { User } from "./user.model.js";


const taskSchema=new Schema(
    {
        title:{
            type:String,
            required:true
        },
        description:{ 
            type:String,
            required:true,
        },
        dueTime:{
            type:Date,
            required:true
        },
        priority:{
            type:String,
            required:true
        },
        status:{
            type:String,
            required:true
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:User
        }
    },
    {
        timestamps:true
    } 
)

export const Task=mongoose.model('Task',taskSchema);
