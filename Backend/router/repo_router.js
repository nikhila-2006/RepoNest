const express=require('express');
const repoController=require('../controllers/repoController');

const repo_router=express.Router();

repo_router.post("/repo/create",repoController.createRepository);

repo_router.get("/repo/all",repoController.getAllRepositories);

repo_router.get("/repo/:id",repoController.fetchRepositoryById);

repo_router.get("/repo/:name",repoController.fetchRepositoryByName);

repo_router.get("/repo/:userID",repoController.fetchRepositoryForCurrentUser);

repo_router.put("/repo/update/:id",repoController.updateRepositoryById);

repo_router.delete("/repo/delete/:id",repoController.deleteRepositoryById);

repo_router.patch("/repo/toggle/:id",repoController.toggleVisibiltyById);


module.exports=repo_router;