const express=require('express')
const server=express()
const cors=require('cors')
const cookieParser=require('cookie-parser')
const morgan=require('morgan')
const staffRoutes=require('./routes/Staff')
const studentRoutes=require('./routes/Student')
const authRoutes=require('./routes/Auth')
const projectRoutes=require('./routes/Project')
const assingmentRoutes=require('./routes/Assingment')
const { verifyToken } = require('./middleware/Auth')
const { connectoToDb } = require('./db/mysql')

connectoToDb()

// middlewares
server.use(express.json())
server.use(cors({origin:"http://localhost:3000",credentials:true}))
server.use(morgan('tiny'))
server.use(cookieParser())


// route middlewares
server.use('/staff',verifyToken,staffRoutes)
server.use('/student',verifyToken,studentRoutes)
server.use("/auth",authRoutes)
server.use("/projects",verifyToken,projectRoutes)
server.use("/assignments",verifyToken,assingmentRoutes)


server.get("/",(req,res)=>{
    res.status(200).json({"message":"running"})
})


server.listen(8000,()=>{
    console.log('server [STARTED] ~ http://localhost:8000')
})
