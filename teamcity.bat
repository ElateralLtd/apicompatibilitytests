call npm install
call npm install -g swagger-diff
call path=%%PATH%%;%%APPDATA%%\npm
call swagger-diff https://%1/%3/api-docs https://%2/%3/api-docs