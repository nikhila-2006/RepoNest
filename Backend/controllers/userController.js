const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const {MongoClient, MongoParseError} =require('mongodb');
const dotenv=require('dotenv');


require("dotenv").config();

const uri=process.env.MONGODB_URI;
let client;

async function connectClient() {
    if(!client){
        client=new MongoClient(uri);
        await client.connect();
    }
}

const getAllUsers=(req,res)=>{
    console.log("All users are fetched!");
}

const signUp=async (req,res)=>{
    const {username,password,email}=req.body;
    try{
        await connectClient();
        const db=client.db("reponest");
        const usersCollection=db.collection("users");
        const user=await usersCollection.findOne({username});
        if(user){
            return res.status(400).json({message:"User already exist"});
        }

        const salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(password,salt);
        const newUser={
            username,
            password:hashPassword,
            email,
            repositories:[],
            followedUsers:[],
            startRepos:[]
        }
        const result=await usersCollection.insertOne(newUser);
        const token=jwt.sign({id:result.insertedId},process.env.JWT_SECRET_KEY,{expiresIn:"1h"});
        res.json({token});
    }catch(err){
        console.error("error during signup:",err.message);
        res.status(500).send('Server error');
    }
}

const login=(req,res)=>{
    console.log("logging in");
}

const getUserProfile=(req,res)=>{
    console.log("User fetched!");
}

const updateUserProfile=(req,res)=>{
    console.log("Profile updated");
}

const deleteUserProfile=(req,res)=>{
    console.log("deleted user!");
}

module.exports={
    getAllUsers,
    signUp,
    login,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile
}