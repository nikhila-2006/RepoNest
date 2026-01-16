const fs=require('fs');
const path=require("path");
const {promisify}=require("util");

const readdir=promisify(fs.readdir);
const copyFile=promisify(fs.copyFile);

async function revertRepo(commitID){
    const repoPath=path.resolve(process.cwd(),'.repNest');
    const commitsPath=path.join(repoPath,'commits');
    try{
        const commitDir=path.join(commitsPath,commitID);
        const files=await readdir(commitDir);
        const parentDir=path.resolve(repoPath,"..");
        for(file of files){
            await copyFile(path.join(commitDir,file),path.join(parentDir,file));
        }
        console.log(`commit ${commitID} has been reverted succefully!`);
    }catch(err){
        console.error("unable to revert:",err.message);
    }
}
module.exports={revertRepo};