const createRepository=(req,res)=>{
    console.log("Repository created");
}
const getAllRepositories=(req,res)=>{
    console.log("all repositories  fetched!");
}
const fetchRepositoryById=(req,res)=>{
    console.log("Repository details fetched");
}

const fetchRepositoryByName=(req,res)=>{
    console.log("Repository details fetched");
}

const fetchRepositoryForCurrentUser=(req,res)=>{
    console.log("Repository fetched for Logged in user Fetched");
}

const updateRepositoryById=(req,res)=>{
    console.log("Repository updated");
}

const toggleVisibiltyById=(req,res)=>{
    console.log("Visibility toggled");
}

const deleteRepositoryById=(req,res)=>{
    console.log("Repository deleted");
}

module.exports={
    createRepository,
    getAllRepositories,
    fetchRepositoryById,
    fetchRepositoryByName,
    fetchRepositoryForCurrentUser,
    updateRepositoryById,
    toggleVisibiltyById,
    deleteRepositoryById
}