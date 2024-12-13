import { Task } from "../model/task.model.js";

const addTask=async (req,res) => {
    const{ tittle, description }=req.body;
    const{ _id } = req.body.user;
    if(!tittle || !description){
        res.status(400).json({message:"task tittle and description are required"})
    }
    console.log(_id)
    console.log(tittle)
    console.log(description)

    const task= await Task.create({
        tittle,
        description,
        _id
    })

    if(!task){
        res.status(500).json({message:"something problem in adding task"})
    }

}

export { addTask };