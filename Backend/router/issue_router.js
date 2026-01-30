const express=require('express');
const issueController=require('../controllers/issueController');

const issue_router=express.Router();

issue_router.post("/issue/create",issueController.createIssue);

issue_router.put("/issue/update/:id",issueController.updateIssueById);

issue_router.delete("/issue/delete/:id",issueController.deleteIssueById);

issue_router.get("/issue/all",issueController.getAllIssues);

issue_router.get("/issue/:id",issueController.getIssueById);


module.exports=issue_router;