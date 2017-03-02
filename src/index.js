//import requestpromise from 'request-promise';
//import request from 'request';

function renderList(level, items, colour) {

  var render = "<li class='list-group-item list-group-item-" + colour + "' data-toggle='collapse' data-target='#" + level + "List'>" + level + "s <span class='badge'>" + items.length + "</span>";

  if(items.length > 0) {
    render += "<ul id='" + level + "List' class='list-group collapse'>";
    items.forEach(function(item) {
      render += "<li class='list-group-item'>" + item.path + "</li>";
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
content += "<h1>Backwards Compatibility Report</h1>";
content += "<ul class='list-group'>";
content += renderList('error', results.errors, 'danger');
content += renderList('warning', results.warnings, 'warning');
content += renderList('info', results.infos, 'info');
content += renderList('unmatchDiff', results.unmatchDiffs, '');
content += "</body></html>";

fs.writeFile("testreport.html", content, function(err) {
    if(err) {
        return console.log(err);
    }

    var summary = "Errors: " + results.errors.length + ", Warnings: " + results.warnings.length + ", Infos: " + results.infos.length + ", UnmatchDiffs: " + results.unmatchDiffs.length;

    console.log("The file was saved!");
    console.log("##teamcity[buildStatus status='SUCCESS' text='" + summary + "']");
});
