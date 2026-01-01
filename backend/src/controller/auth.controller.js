
//// storing user details after clerk authentication if user is new then signup (store in the database) and if existing then login


import { User } from "../model/user.model.js";


export const authCallback=async(req,res,next)=>
{
    try{
        const {id,firstName,lastName,imageUrl}=req.body;
        const user=await User.findOne({clerkId:id}); // Check if user with given clerkId exists in the database
        if(!user)
        {
            //signup
            await User.create({ //if the user is not present store the user details in the database
                clerkId:id,
                fullName:`${firstName} ${lastName}`,
                imageUrl:imageUrl
            });

        }

    return res.status(200).json({
      success: true,
      user
    });


    }
    catch(err)
    {
        next(err); // pass any errors to the next middleware for handling
        
    }
}