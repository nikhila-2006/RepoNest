require("dotenv").config();
const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const http=require("http");
const {Server}=require("socket.io");
const main_router=require('./router/main_router.js');
const yargs=require("yargs");
const {hideBin} =require('yargs/helpers');
const {initRepo}=require("./controllers/init.js");
const {addRepo}=require("./controllers/add.js");
const {commitRepo}=require("./controllers/commit.js");
const {pullRepo}=require("./controllers/pull.js");
const {pushRepo}=require("./controllers/push.js");
const {revertRepo}=require("./controllers/revert.js");
const { start } = require("repl");

yargs(hideBin(process.argv))
//init command
.command('init', 'Initialise a new repository', () => {},initRepo)
//add command
.command('add <file>', 'Add a new file into repository', (yargs)=>{
    return yargs.positional("file",{
        describe:"File is added to the staging area",
        type:"string",
    })
},(argv)=>{
    addRepo(argv.file);
})
//commit command
.command('commit', 'Record changes to the repository', (yargs) => {
    return yargs.option('m', {
        alias: 'message',
        type: 'string',
        demandOption: true,
        describe: 'Commit message'
    });
},(argv)=>{
    commitRepo(argv.message);
})
//pull command
.command('pull', 'Fetch from and integrate with another repository or a local branch', () => {},pullRepo)
//push command
.command('push', 'Update remote refs along with associated objects', () => {},pushRepo)
//revert command
.command('revert <commitID>', 'Reset current HEAD to the specified state', (yargs) => {
    yargs.positional("commitID",{
        describe:"Commit ID to revert to",
        type:"string"
    });
},(argv)=>{
    revertRepo(argv.commitID);
})
.demandCommand(1,"You need to provide at least one command")
.help()
.parse();

function startServer(){
    const app=express();
    const port=process.env.PORT || 3000;
    app.use(bodyParser.json());
    app.use(express.json());
    const mongoURL=process.env.MONGODB_URI;
    mongoose.connect(mongoURL).then(()=>{
        console.log("MongoDB is connected!");
    }).catch((err)=>{
        console.error("unable to connect:",err.message);
    })

    app.use(cors({origin:"*"}));    

    app.use(main_router);
    let user="test";    
    const httpServer=http.createServer(app);
    const io=new Server(httpServer,{
        cors:{
            origin:"*",
            methods:["GET","POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log("Socket connected:", socket.id);

        socket.on("joinRoom", (userID) => {
            socket.join(userID);
            console.log(`User joined room: ${userID}`);
        });
    });

    httpServer.listen(port, () => {
        console.log(`Server is running on PORT ${port}`);
    });
}

startServer();