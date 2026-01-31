const express=require('express');
const userController=require('../controllers/userController');

const user_router=express.Router();

user_router.get("/allUsers",userController.getAllUsers);

user_router.post("/signup",userController.signUp);

user_router.post("/login",userController.login);

user_router.get("/userProfile",userController.getUserProfile);

user_router.put("/updateProfile",userController.updateUserProfile);

user_router.delete("/deleteProfile",userController.deleteUserProfile);


module.exports=user_router;