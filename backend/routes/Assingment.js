const express=require('express')
const router=express.Router()
const assignmentsController=require("../controllers/Assingment")


router
    .post("/",assignmentsController.create)
    .get("/:id",assignmentsController.getAll)
    .get("/student/:id",assignmentsController.getByStudentId)
    .delete("/:id",assignmentsController.deleteById)


module.exports=router