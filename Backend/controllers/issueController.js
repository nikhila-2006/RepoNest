const createIssue=(req,res)=>{
    console.log("Issue created!");
}
const updateIssueById=(req,res)=>{
    console.log("update Issues");
}
const deleteIssueById=(req,res)=>{
    console.log("Delete issues");
}
const getAllIssues=(req,res)=>{
    console.log("All issued fetched");
}
const getIssueById=(req,res)=>{
    console.log("Issue details fetched!");
}

module.exports={
    createIssue,
    updateIssueById,
    deleteIssueById,
    getAllIssues,
    getIssueById
}