set oldApiUrl=https://%1/%3/api-docs
set newApiUrl=https://%2/%3/api-docs

call npm install
call npm install -g swagger-diff
call path=%%PATH%%;%%APPDATA%%\npm
call swagger-diff -o testreport.json %oldApiUrl% %newApiUrl%
call npm run run --oldApiHost=%1 --newApiHost=%2 --apiVersion=%3

set "oldApiUrl="
set "newApiUrl="
