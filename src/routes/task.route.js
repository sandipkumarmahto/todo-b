import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addTask, getTasks } from "../controller/task.controller.js";

const taskRouter=Router();

taskRouter.post('/addTask',verifyJWT,addTask);
taskRouter.get('/getTasks',getTasks);

export default taskRouter;