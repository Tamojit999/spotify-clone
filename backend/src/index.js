
//// express server setup in backend/src/index.js

import express from 'express' // import express module for server creation
const app = express() // create an instance of express application


//// database connection setup

import connectDB from './lib/db.js' // import database connection function


//// environment variable setup

import dotenv from 'dotenv' // import dotenv module to manage environment variables
dotenv.config() // load environment variables from .env file
const PORT = process.env.port || 3000 // set server port from environment variable or default to 3000

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