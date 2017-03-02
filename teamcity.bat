call npm install -g swagger-diff
call npm run test --silent && exit 0
call npm run run
rem call npm install

rem call path=%%PATH%%;%%APPDATA%%\npm
rem call swagger-diff https://%1/%3/api-docs https://%2/%3/api-docs
