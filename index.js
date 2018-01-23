const gitHubApi = require('github'),
      prettyjson = require('prettyjson'),
      dotEnv = require('dotenv').config();


let github = new gitHubApi({
});

github.authenticate({
    type: 'oauth',
    token: process.env.AUTH_TOKEN
  });
  
github.issues.get({
  owner: process.env.GH_USER,
  repo:process.env.REPO_NAME,
  number:'1007'
}, function (err, res) {
  if (err){
    throw err;
  } 
  let content = res.data.body.split('\n');
  content.forEach(line => {
      console.log(line);
    let       
  });
//   console.log(prettyjson.render(res.data)); 
});