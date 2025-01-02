import { Task } from "../model/task.model.js";

const addTask=async (req,res) => {
    const{ title, description, priority, dueTime }=req.body;
    // console.log(req.body)
    const{ _id } = req.user;
    const status="pending";
    if(!title || !description || !priority || !dueTime){
        return res.status(400).json({message:"task title and description are required"})
    }
    console.log(_id)
    console.log(title)
    console.log(description) 

    const task= await Task.create({
        title:title,
        description:description,
        priority:priority,
        dueTime:dueTime,
        status:status,
        userId:_id
    })

    if(!task){
        return res.status(500).json({message:"something problem in adding task"})
    }
    return res.status(200).json({message:"task added successfully",
        task:task
    })

}

const getTasks=async (req,res) => {
    try {
        const { _id }= req.user;
        // console.log(req)
        console.log("in getTasks controller")
        const tasks= await Task.find({ userId: _id , status:"pending"});
        // const tasks= await Task.find();
        // console.log(tasks)
        if(tasks.length===0){
            return res.status(200).json({message:"you have not task please add the task",
                tasks 
            })
        }
        return res.status(200).json({
            tasks
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({message:"something went wrong"})

    }
}

const deleteTask=async(req,res) =>{
    try {
        const { id } = req.params;
        console.log(id);
        // console.log(req)
        console.log("in delete controller");
        const deleted = await Task.findOneAndDelete(id);
        if (!deleted) {
          return res.status(404).json({ message: "could not detele the task" });
        }
        return res.status(204).json({ message: "task deleted successfully" });
      } catch (error) {
        return res.status(500).json({ message: error.message });
        console.log(error);
      }
} 

const completeTask=async (req,res) => {
    try {
        const { id} = req.params;
        console.log('in complete controller')
        console.log(id)
        const updated= await Task.findByIdAndUpdate(id, {status: "completed"}, {new:true})
        console.log(updated)
        if (!updated) {
            return res.status(404).json({ message: "task not found" });
        }
        return res.status(200).json(updated);
    } catch (error) {
        return res.status(500).json({message:'something erro in server'})
    }
}

export { addTask,getTasks,deleteTask, completeTask };