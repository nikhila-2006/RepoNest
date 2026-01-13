const { PutObjectCommand } = require("@aws-sdk/client-s3");
const fs=require('fs').promises;
const path=require("path");
const {s3}=require("../config/aws-config.js");


async function pushRepo() {
    const repoPath=path.resolve(process.cwd(),'.repNest');
    const commitsPath=path.join(repoPath,'commits');
    try{
        const commitDirs=await fs.readdir(commitsPath);
        for(const commitDir of commitDirs){
            const commitPath=path.join(commitsPath,commitDir);
            const files=await fs.readdir(commitPath);
            for(const file of files){
                const filePath=path.join(commitPath,file);
                const fileContent=await fs.readFile(filePath);
                const command = new PutObjectCommand({
                    Bucket: process.env.S3_BUCKET_NAME,
                    Key: `commits/${commitDir}/${file}`,
                    Body: fileContent,
                    Region:process.env.AWS_REGION
                });

                await s3.send(command);
            }
        }
        console.log("All commits pushed to s3.");
    }catch(err){
        console.error("Error pushing to S3:",err.message);
    }
}
module.exports={pushRepo};