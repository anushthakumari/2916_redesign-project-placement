const mongoose=require("mongoose")
const {Schema}=mongoose


const studentSchema= new Schema({
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    id:{
        type:String,
        required:true
    },
    degree:{
        type:String,
        required:true
    },
    subCourse:{
        type:String,
        required:true
    },
    entryYear:{
        type:String,
        required:true
    },
    modeType:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("Student",studentSchema)