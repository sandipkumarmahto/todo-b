import { Router } from "express";
import { testing1 } from "../controller/test.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const testRouter=Router()

testRouter.post('/t1', verifyJWT,testing1)

export default testRouter;