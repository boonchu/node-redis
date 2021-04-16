#### NodeJS CI

  * https://github.com/craig-br/ans-tower-devsecops/blob/master/JenkinsFile_JuiceShop

#### NodeJS Docker CI

  * https://medium.com/@naistangz/building-a-ci-cd-pipeline-for-a-node-js-app-with-docker-and-jenkins-ee6db6e70d25
  * https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

#### ESLint syntax

  * https://stackoverflow.com/questions/42706584/eslint-error-parsing-error-the-keyword-const-is-reserved
  * https://gist.github.com/nkbt/9efd4facb391edbf8048
  * https://github.com/GoogleCloudPlatform/opentelemetry-operations-js/issues/84#issuecomment-642081224

#### Sonarqube Scanner 

  * Configure 'Manage Jenkins' -> 'Global Tool Configuration' -> 'SonarQube Scanner'
  * Setup 'Sonar Scanner 4.6' -> Use Sonar Scanner 4.6
  * Configure 'Manage Jenkins' -> 'Configure System' -> 'Sonar Scanner Server'
  * check box 'Environment Variable -> setup name 'Sonar Scanner Server' -> setup url 'http://sonarqube-sonarqube:9000'
  * Access https://sonarqube.ingress.local (admin/admin)
  * Create new project 'node-redis' to get access token and update to Jenkinsfile.

```
sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=node-redis \
	-Dsonar.sources=. -Dsonar.host.url=http://sonarqube-sonarqube:9000 \
	-Dsonar.login=[ACCESS TOKEN] \
	-Dsonar.exclusions=node_modules/*/**,test/**/*"
```

#### Node Test with Mocha and Chai
  
  * https://www.digitalocean.com/community/tutorials/test-a-node-restful-api-with-mocha-and-chai
  * https://www.linkedin.com/pulse/how-make-tests-using-chai-mocha-sam-barros/
  * https://medium.com/@asciidev/testing-a-node-express-application-with-mocha-chai-9592d41c0083
  * https://github.com/BretFisher/node-docker-good-defaults/tree/85520919f56ce82ea0086751327590b44d758b8e
  * https://stackoverflow.com/questions/64336642/nodejs-testing-error-timeout-of-2000ms-exceeded
  * https://stackoverflow.com/questions/33986863/mocha-api-testing-getting-typeerror-app-address-is-not-a-function
