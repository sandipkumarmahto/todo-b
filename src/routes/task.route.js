import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addTask } from "../controller/task.controller.js";

const taskRouter=Router();

taskRouter.post('/addTask',verifyJWT,addTask);

export default taskRouter;