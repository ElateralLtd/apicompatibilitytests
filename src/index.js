var oldApiUrl = 'https://' + process.env.npm_config_oldApiHost + '/' + process.env.npm_config_apiVersion + '/api-docs';
var newApiUrl = 'https://' + process.env.npm_config_newApiHost + '/' + process.env.npm_config_apiVersion + '/api-docs';

function renderList(level, items, colour) {
  var render = "<li class='list-group-item list-group-item-" + colour + "' data-toggle='collapse' data-target='#" + level + "List'><h1>" + level + "s <span class='badge'>" + items.length + "</span></h1>";
  if(items.length > 0) {
    render += "<ul id='" + level + "List' class='list-group collapse'>";
    var counter = 1;
    items.forEach(function(item) {
      render += "<li class='list-group-item'>"
      render += "<h4 class='list-group-item-heading'><span class='badge'>" + counter + "</span> " + item.path + "</h4>";
      render += "<p class='list-group-item-text' title='" + item.ruleId + "'>";
      render += item.message;
      render += "</p>";
      render += "</li>";
      counter++;
    });
    render += "</ul>";
  }
  return render + "</li>";
}

var fs = require('fs');
var results = JSON.parse(fs.readFileSync('testreport.json', 'utf8'));

var content = "<!DOCTYPE html><html>";
content += "<head lang='en'>";
content += "  <title>Elateral.IO Backwards Compatibility Test Report</title>";
content += "  <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'>";
content += "  <script src='https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js'></script>";
content += "  <script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'></script>";
content += "  <meta name='viewport' content='width=device-width, initial-scale=1'>"
content += "  <meta charset='utf-8'>";
content += "</head>";
content += "<body>";
content += "<div class='container'>";
content += "<div class='jumbotron'>";
content += "  <h1>API Difference Analysis</h1>";
content += "  <p>Old API = " + oldApiUrl + " <a class='btn btn-default' href='" + oldApiUrl + "' target='_blank' rel='nofollow'>View</a></p>";
content += "  <p>New API = " + newApiUrl + " <a class='btn btn-default' href='" + newApiUrl + "' target='_blank' rel='nofollow'>View</a></p>";
content += "</div>";

content += "<h1>Backwards Compatibility Report</h1>";
content += "<ul class='list-group'>";
content += renderList('error', results.errors, 'danger');
content += renderList('warning', results.warnings, 'warning');
content += renderList('info', results.infos, 'info');
content += renderList('unmatchDiff', results.unmatchDiffs, '');
content += "</div></body></html>";

fs.writeFile("testreport.html", content, function(err) {
    if(err) {
        return console.log(err);
    }

    var summary = "Issues breaking: " + results.errors.length + ", warnings: " + results.warnings.length + ", infos: " + results.infos.length + ", undetermines: " + results.unmatchDiffs.length;
    var passFail = results.errors.length > 0 ? 'FAILURE' : 'SUCCESS';
    console.log("The file was saved!");
    console.log("##teamcity[buildStatus status='" + passFail + "' text='" + summary + "']");
});
