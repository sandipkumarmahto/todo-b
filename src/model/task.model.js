import mongoose, { mongo, Schema } from "mongoose";
import { User } from "./user.model.js";


const taskSchema=new Schema(
    {
        tittle:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true,
        },
        priority:{
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
        timeseries:true
    }
)

export const Task=mongoose.model('Task',taskSchema);
