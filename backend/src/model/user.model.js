import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        
    },
    imageUrl:{
        type:String,
       
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