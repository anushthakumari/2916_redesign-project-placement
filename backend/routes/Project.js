const express=require('express')
const router=express.Router()
const projectController=require("../controllers/Project")

router
    .get("/",projectController.getAll)
    .get("/:id",projectController.getById)
    .get("/professor/:id",projectController.getByProfessorId)
    .post("/",projectController.create)
    .post("/send-mail",projectController.sendProjectApplyMail)
    .patch('/:id',projectController.updateById)
    .delete("/:id",projectController.deleteById)

module.exports=router