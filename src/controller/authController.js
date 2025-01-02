import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";
 

const generatAccessAndRefreshTokens = async(userId) => {
    try {
        const user=await User.findById(userId)
        const accessToken= await user.generateAccessToken()
        const refreshToken= await user.generateRefreshToken()
        user.refreshToken=refreshToken
        const user1=await user.save({ validateBeforeSave: false }) 
        return{refreshToken, accessToken}
    } catch (error) {
        console.log(error)
    } 
}

const loginUser = async (req, res) => {
    console.log("in loginUSer controller")
    const {email, password}=req.body;
    console.log(email)

    if(!email){
        return res.status(400).json({message:"email is required"})
        // throw new ApiError(400,"username or email is required")
    }

    if(!password){
        return res.status(400).json({message:"password is required"})
    }
    const user = await User.findOne({email});
    if(!user){
        // throw new ApiError(400,"user not found")
        return res.status(404).json({message:"user not found"})
    }
   const isPasswordValid= await user.isPasswordCorrect(password)
   if(!isPasswordValid){
    return res.status(401).json({message:"incorrect password"})
   }
   const {refreshToken,accessToken}= await generatAccessAndRefreshTokens(user._id)
   console.log(refreshToken)
   console.log(accessToken)
   const logggedInUSer=await User.findOne(user._id).select("-password -refreshToken")
   const options={
    httpOnly:true, 
    secure:true
   }
   return res.status(200)
   .cookie("accessToken", accessToken, options)
   .cookie("refreshToken", refreshToken, options)
   .json({ user:logggedInUSer, accessToken, refreshToken, messgae:"user login successfully"  })
}

const logOutUser=async(req,res) =>{
    console.log("in logout controller")
    await User.findByIdAndUpdate(req.user._id,
        {
            $set:{
                refreshToken:undefined
            }
        },
        {
            new:true
        }
    )
    const options={
        httpOnly:true,
        secure:true
       }
    return res.status(200).clearCookie('refreshToken').clearCookie('accessToken').json({message:"user logout successfully"})
}

const refreshAccessToken= async(req,res) =>{
    const refreshToken=req.body.refreshToken;
    if(!refreshToken){
        return res.status(400).json({message:"refresh token is required"})
    }
    const decodedToken=jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);

    const user=await User.findById(decodedToken._id);
    if(!user){
        return res.status(403).json({ error: "Invalid or expired refresh token" });
    }
    
    const accessToken=user.generateAccessToken();

    return res.status(200).json({accessToken})
}

export {loginUser, logOutUser, refreshAccessToken};