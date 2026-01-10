// import file system modules
const fs = require("fs");
const fsPromises = fs.promises;


const path=require("path");

async function initRepo(){
    const repoPath=path.resolve(process.cwd(),".repNest");
    const commitsPath=path.join(repoPath,"commits");

    try{
        if (fs.existsSync(repoPath)) {
            console.log("Repository already initialised");
            return;
        }
        await fsPromises.mkdir(repoPath,{recursive:true});
        await fsPromises.mkdir(commitsPath,{recursive:true});
        await fsPromises.writeFile(
            path.join(repoPath,"config.json"),
            JSON.stringify({bucket:process.env.S3_BUCKET})
        );
        console.log("Repository intialised");
    }catch(err){
        console.log("Error occured during intialisation",err.message);
    }
}


module.exports={initRepo};
