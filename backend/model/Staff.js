const mongoose=require("mongoose")
const {Schema}=mongoose


const staffSchema= new Schema({
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    staffId:{
        type:String,
        required:true
    },
    moduleLeader:{
        type:Boolean,
        required:true
    },
    moduleId:{
        type:String,
    }
})

module.exports=mongoose.model("Staff" ,staffSchema)