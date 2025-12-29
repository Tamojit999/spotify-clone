import mongoose from 'mongoose'; // import mongoose for MongoDB interactions


 const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGODB_URL); // connect to MongoDB using connection string from environment variables
        console.log("Database connected successfully:",conn.connection.host); // log success message with host info

    }catch(err){
        console.log("Database connection error:",err);
        process.exit(1); // exit process with failure
    }
}
export default connectDB;