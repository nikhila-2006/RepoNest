const getAllUsers=(req,res)=>{
    console.log("All users are fetched!");
}

const signIn=(req,res)=>{
    console.log("Signing in");
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
    signIn,
    login,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile
}