import express from "express";
import userRouter from "./src/routes/UserRoute.js";
import taskRouter from "./src/routes/task.route.js";
import cors from 'cors';
import connectDB from "./src/configuration/dbConfig.js";
import testRouter from "./src/routes/test.route.js";
import cookieParser from "cookie-parser";



const app=express();


app.use(cors())
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extends:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.use('/user', userRouter); 
app.use('/task', taskRouter);
app.use('/test', testRouter);


 
app.get('/',(req,res) =>{
 res.send("todo app")
})


connectDB()
.then(()=>{
    app.listen(process.env.PORT,() =>{
        console.log(`app listening of port ${process.env.PORT}`)
    })
})
.catch((err) =>{
    console.log("database connection failed")
})