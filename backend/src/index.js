
//// express server setup in backend/src/index.js

import express from 'express' // import express module for server creation
const app = express() // create an instance of express application


import cors from "cors" 

app.use(cors({
  origin:'http://localhost:3000',
  credentials:true
}))

/// import path module for handling file paths

import path from 'path' 

const __dirname = path.resolve(); // get the directory name of the current module

//// database connection setup

import connectDB from './lib/db.js' // import database connection function

//// authentication setup

import {clerkMiddleware} from '@clerk/express' // import Clerk for authentication
app.use(clerkMiddleware()) // use Clerk middleware for authentication



//// middleware setup

app.use(express.json()) // middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true })) // middleware to parse URL-encoded request bodies


//// environment variable setup

import dotenv from 'dotenv' // import dotenv module to manage environment variables
dotenv.config() // load environment variables from .env file
const PORT = process.env.port || 3000 // set server port from environment variable or default to 3000

//// control the file upload 

import fileUpload from 'express-fileupload' // import express-fileupload module for handling file uploads
app.use(fileUpload( // configure file upload middleware
  {
    useTempFiles: true, // enable temporary file usage for uploads
    tempFileDir: path.join(__dirname, 'tmp'), // set temporary file directory for uploads
    createParentPath: true, // create parent directories if they do not exist
    limits: { fileSize: 10 * 1024 * 1024 }, // limit file size to 10MB

  }
)); 


//// sever listening

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT)


    connectDB() // connect to the database when server starts
})


//// user routes setup

import userRoutes from './routes/user.route.js' // import user routes from user.routes.js
import authRoutes from './routes/auth.route.js' // import auth routes from auth.routes.js
import adminRoutes from './routes/admin.route.js' // import admin routes from admin.routes.js
import songRoutes from './routes/song.route.js' // import song routes from song.routes.js
import albumRoutes from './routes/album.route.js' // import album routes from album.routes.js
import statRoutes from './routes/stat.route.js' // import stats routes from stats.routes.js

app.use('/api/users', userRoutes) // use user routes for '/users' endpoint
app.use('/api/auth', authRoutes) // use user routes for '/auth' endpoint
app.use('/api/admin', adminRoutes) // use user routes for '/admin' endpoint
app.use('/api/songs', songRoutes) // use user routes for '/songs' endpoint
app.use('/api/albums', albumRoutes) // use user routes for '/albums' endpoint
app.use('/api/stats', statRoutes) // use user routes for '/stats' endpoint




//// error handling middleware

app.use((err, req,res,next)=>
{
  res.status(500).json({message:process.env.NODE_ENV==='development'?err.message:"Internal Server Error"}); // send detailed error message in development mode, generic message in production
});