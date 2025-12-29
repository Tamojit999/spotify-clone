import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
        unique:true,
    },
    clerkId:{  // we are using clerk for authentication so we will store clerk id here so that we can identify user
        type:String,
        unique:true,     
        required:true,
    },
},
    

{timestamps:true} // automatically manage createdAt and updatedAt fields

);

export const User=mongoose.model("User",userSchema);