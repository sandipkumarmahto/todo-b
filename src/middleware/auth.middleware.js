import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.headers['authorization']?.replace("Bearer ","")
    // const token = req.headers['authorization']?.replace("Bearer ","")

    console.log(token) 
    console.log('in auth middleware')
     
    
    if (!token) {
      res.status(401).json({ message: "unauthorized request" });
    }
    
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); 

    const user = await User.findById(decodedToken._id).select(
      "-password "
    );
    
    if (!user) {
      res.status(401).json({ message: "invalid access token" }); 
    }

    req.user = user;
    console.log("in auth middleware")
    next();
  } catch (error) {
    res.status(401).json({ message: "something error" });
    console.log(error);
  } 
};
 