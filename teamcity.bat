call npm install
call npm install -g swagger-diff
call path=%%PATH%%;%%APPDATA%%\npm
call npm run test --silent && exit 0
call npm run run



rem call swagger-diff https://%1/%3/api-docs https://%2/%3/api-docs
