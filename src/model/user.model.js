import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema=new Schema(
    {
        fullname:{
            type:String,
            require:true
        },
        email:{
            type:String,
            require:true
        },
        mobile:{
            type:String,
            require:true
        },
        password:{
            type:String,
            require:true
        },
        ps:{
            type:String,
            require:true
        },
        refreshToken:{
            type:String,
            require:true
        }
    },
    { 
        timestamps:true
    }
)

UserSchema.pre('save',async function (next) {
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10);
    }
    next();
})

UserSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

UserSchema.methods.generateAccessToken=async function(){
    return jwt.sign({
        _id:this._id,
        fullname:this.fullname,
        email:this.email,
        mobile:this.mobile
        },
        process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
UserSchema.methods.generateRefreshToken=async function(){
    return jwt.sign({
        _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,{
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User=mongoose.model("User",UserSchema);