const express=require('express')
const router=express.Router()
const authController=require("../controllers/Auth")
const { verifyToken } = require('../middleware/Auth')

router
    .post("/login/staff",authController.loginStaff)
    .post("/login/student",authController.loginStudent)
    .post("/signup/student",authController.createStudent)
    .post("/signup/staff",authController.createStaff)
    .get("/logout",authController.logout)
    .get('/checkauth',verifyToken,authController.checkAuth)

module.exports=router