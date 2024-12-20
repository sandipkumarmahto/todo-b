import { Router } from "express";
import { findUser, registerUser } from "../controller/userController.js";
import { loginUser, logOutUser, refreshAccessToken } from "../controller/authController.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { User } from "../model/user.model.js";

const router=Router();

router.get('/',(req,res) => {
    res.send("this is home of user controller")
})

router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/refresh',refreshAccessToken)
router.post('/logout', verifyJWT ,logOutUser)
router.get('/getUser',verifyJWT, findUser )

export default router;
 