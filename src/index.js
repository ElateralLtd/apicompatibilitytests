//import requestpromise from 'request-promise';
//import request from 'request';

var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('testreport.json', 'utf8'));

var content = "<html><body>";
content += "<h1>Backwards Compatibility Report</h1>";
content += "</body></html>";

fs.writeFile("testreport.html", content, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});

// const teamcityUrl = 'https://builds.elateral.com/httpAuth/app/rest/buildTypes/id:PROJECTID/builds/running:false';
// const teamcityHeaders = {
//    'cache-control': 'no-cache',
//    accept: 'application/json',
//    authorization: 'Basic c2ltb24uaHVybGV5OmJlJHRGb2cyNA=='
// };
//
// var getLastWebAppRegressionTestBuild = {
//   method: 'GET',
//   url: teamcityUrl.replace('PROJECTID', 'ElateralIo_NightlyQa_EndToEndRegression'),
//   headers: teamcityHeaders
// };
//
// var webAppRegressionResult = {};
//
// console.log('Calling TeamCity API for last test results');
//
// requestpromise(getLastWebAppRegressionTestBuild)
//   .then(function (response) {
//     var result = JSON.parse(response);
//
//     console.log('Found test results');
//   })
//   .catch(function (err) {
//     if (error) throw new Error(error);
//     console.log(err);
//   });
