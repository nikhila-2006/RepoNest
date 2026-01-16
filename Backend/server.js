const yargs=require("yargs");
const {hideBin} =require('yargs/helpers');
const {initRepo}=require("./controllers/init.js");
const {addRepo}=require("./controllers/add.js");
const {commitRepo}=require("./controllers/commit.js");
const {pullRepo}=require("./controllers/pull.js");
const {pushRepo}=require("./controllers/push.js");
const {revertRepo}=require("./controllers/revert.js");

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