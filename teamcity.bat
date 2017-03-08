@ECHO OFF
setlocal ENABLEDELAYEDEXPANSION
if "%DONOTRUNONENVIRONMENT%" == "true" (
	echo ##teamcity[buildStatus status='NotSuitable' text='These tests are not suitable for this environment']
) else (
	set oldApiUrl=https://%1/%3/api-docs
	set newApiUrl=https://%2/%3/api-docs

	echo oldApiUrl=https://%1/%3/api-docs
	echo newApiUrl=https://%2/%3/api-docs
	call npm install
	call npm install -g swagger-diff
	call path=%%PATH%%;%%APPDATA%%\npm
	echo swagger-diff -o testreport.json !oldApiUrl! !newApiUrl!
	call swagger-diff -o testreport.json !oldApiUrl! !newApiUrl!
	call npm run run --oldApiHost=%1 --newApiHost=%2 --apiVersion=%3

	set "oldApiUrl="
	set "newApiUrl="
)