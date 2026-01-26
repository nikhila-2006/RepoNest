const express=require('express');
const main_router=express.Router();
const user_router=require('./user_router');
const repo_router=require('./repo_router');
main_router.use(user_router);
main_router.use(repo_router);
main_router.get("/",(req,res)=>{
    res.send("Welcome!");
})
module.exports=main_router;