import { Task } from "../model/task.model.js";

const addTask=async (req,res) => {
    const{ title, description, priority,user }=req.body;
    console.log(req.body)
    const{ _id } = req.user;
    if(!title || !description || !priority){
        res.status(400).json({message:"task title and description are required"})
    }
    console.log(_id)
    console.log(title)
    console.log(description) 

    const task= await Task.create({
        title:title,
        description:description,
        priority:priority,
        userId:_id
    })

    if(!task){
        res.status(500).json({message:"something problem in adding task"})
    }
    res.status(200).json({message:"task added successfully",
        task:task
    })

}

const getTasks=async (req,res) => {
    try {
        // const { _id }= req.user;
        // console.log(req.user)
        console.log("in controller")
        // const tasks= await Task.find({ userId: _id });
        const tasks= await Task.find();
        console.log(tasks)
        if(tasks.length==0){
            res.status(400).json({message:"you have not task please add the task"})
        }
        res.status(200).json({
            tasks
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})

    }
}

export { addTask,getTasks };