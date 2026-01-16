const fs=require('fs').promises;
const path=require('path');
const {s3}=require("../config/aws-config.js");
const {ListObjectsV2Command,GetObjectCommand} = require("@aws-sdk/client-s3");

async function pullRepo() {
    const repoPath=path.resolve(process.cwd(),'.repNest');
    const commitsPath=path.join(repoPath,'commits');
    try{
        const listCommand = new ListObjectsV2Command({
            Bucket: process.env.S3_BUCKET_NAME,
            Prefix: "commits/"
        });
        const data = await s3.send(listCommand);
        const objects = data.Contents || [];
        for(const object of objects){
            const key=object.Key;
            const commitDir=path.join(commitsPath,path.dirname(key).split("/").pop());
            await fs.mkdir(commitDir,{recursive:true});

            const getCommand = new GetObjectCommand({
                Bucket: process.env.S3_BUCKET_NAME,
                Key: key
            });
            const response = await s3.send(getCommand);

            const filePath = path.join(repoPath, key);
            await fs.mkdir(path.dirname(filePath), { recursive: true });
            const chunks = [];
            for await (const chunk of response.Body) {
                chunks.push(chunk);
            }

            await fs.writeFile(filePath, Buffer.concat(chunks));
    }
        console.log("All files have been pulled succesfully");
    }catch(err){
        console.error("unable to pull:",err.message);
    }
}
module.exports={pullRepo};