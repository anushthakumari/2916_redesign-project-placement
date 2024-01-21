const express=require("express")
const router=express.Router()
const studentController=require('../controllers/Student')

router
    .get('/:id',studentController.getById)
    .patch("/:id",studentController.updateById)
    .delete("/:id",studentController.deleteById)

module.exports=router