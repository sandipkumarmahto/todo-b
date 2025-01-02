import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addTask, getTasks, deleteTask, completeTask } from "../controller/task.controller.js";

const taskRouter=Router();

taskRouter.post('/addTask',verifyJWT,addTask);
taskRouter.get('/getTasks',verifyJWT,getTasks);
taskRouter.delete('/deleteTask/:id',deleteTask);
taskRouter.put('/complete/:id',completeTask);

export default taskRouter;