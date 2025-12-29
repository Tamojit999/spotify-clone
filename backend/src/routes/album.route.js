import { Router } from "express"; // import Router from express module to create modular route handlers
const router = Router(); // create a new router instance

router.get("/",(req,res)=>
{
    res.send("album route works");

});

export default router; // export the router to be used in other parts of the application