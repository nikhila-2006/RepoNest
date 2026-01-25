const mongoose=require('mongoose');
const {Schema}=mongoose;

const UserSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
    },
    repositories:[{
        default:[],
        type:Schema.type.ObjectId,
        ref:"Repository"
    }],
    followedUsers:[{
        default:[],
        type:Schema.type.ObjectId,
        ref:"User"
    }],
    starRepos:[{
        default:[],
        type:Schema.type.ObjectId,
        ref:"Repository"
    }]
});

const User=mongoose.model("User",UserSchema);

export default User;
