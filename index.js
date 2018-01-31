const gitHubApi = require('github'),
      prettyjson = require('prettyjson'),
      ncp = require("copy-paste"),
      dotEnv = require('dotenv').config(),
      owner_name = process.env.GH_USER,
      repo_name = process.env.REPO_NAME;

let github = new gitHubApi({});

github.authenticate({
    type: 'oauth',
    token: process.env.AUTH_TOKEN
  });
  
github.issues.get({
  owner: owner_name,
  repo: repo_name,
  number:'1007'
}, function (err, res) {
  if (err){
    throw err;
  } 
  let content = res.data.body.split('\n');
  let parsedContent= content.filter(val => {return val!="\r"});
  parsedContent.forEach(line => {
      let test = /-.*issues\/(\d*)/gi.exec(line);
      let issueNumber = test[1];
      github.issues.get({'owner':owner_name,'repo': repo_name,'number': issueNumber},(err,res)=>{
        if(err){
          console.log('there was an error'+err);
        }
        console.log(line.replace(/\[.*\](.*)/,'[ ] ['+res.data.title+']($1)'));
//        console.log(res.data.title);
      })   
  });
});