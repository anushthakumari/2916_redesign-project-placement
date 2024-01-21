const express=require("express")
const router=express.Router()
const staffController=require("../controllers/Staff")

router
    .get('/:id',staffController.getById)
    .patch("/:id",staffController.updateById)
    .delete("/:id",staffController.deleteById)

module.exports=router