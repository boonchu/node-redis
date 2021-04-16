#!/usr/bin/env groovy

// https://github.com/jenkinsci/kubernetes-plugin/blob/master/examples/multi-container.groovy
// https://github.com/jenkinsci/kubernetes-plugin#container-group-support

pipeline {
    agent {
        kubernetes {
            yaml '''
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: node
    image: localhost:5000/node:custom
    command:
    - sleep
    args:
    - infinity
  - name: sonar-scanner
    image: localhost:5000/sonar-scanner-cli:custom
    command:
    - sleep
    args:
    - infinity

'''
            defaultContainer 'node'
        }
    }
    stages {
        
        stage('SCM Get Code') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], userRemoteConfigs: [[url: 'https://github.com/boonchu/node-redis.git']]])
            }
        }

        stage('Code Lint Analysis') {
            steps {
                container('node') {
                    sh "npm install --production --unsafe-perm"
                    sh "npm audit fix"
                    sh "npm link @angular/cli"
                    sh "npm run lint"
                }
            }
        }
        
        // https://docs.sonarqube.org/latest/analysis/scan/sonarscanner-for-jenkins/
        stage('SonarQube analysis') {
            
        //    environment {
        //        JAVA_HOME = '/usr/lib/jvm/default-java'
        //        PATH      = "${JAVA_HOME}/bin:${PATH}"
        //    }

            steps {
                container('sonar-scanner') {
                    script {
                        // https://github.com/SonarSource/sonar-scanner-jenkins/blob/master/sonar-docs/analysis/scan/sonarscanner-for-jenkins.md#using-a-jenkins-pipeline
                        def scannerHome = tool 'Sonar Scanner 4.5';
                        withSonarQubeEnv('Sonar Scanner 4.5 Server') { 
                            // https://kb.novaordis.com/index.php/Jenkins_Pipeline_Environment_Variables
                            echo "++++++++++++++++++++++++++"
                            echo env.JAVA_HOME
                            echo env.PATH
                            sh "printenv"
                            echo "++++++++++++++++++++++++++"
                            sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=node-redis -Dsonar.sources=. -Dsonar.host.url=http://sonarqube-sonarqube:9000 -Dsonar.login=61faf3659971abb58f753eb6c449a8d859a838f7 -Dsonar.exclusions=node_modules/*/**,test/**/*"
                        }
                    }
                }
            }    
        }
        
        stage('Unit Test') {
            steps {
                container('node') {
                    sh "npm install --production --unsafe-perm"
                    sh "npm audit fix"
                    sh "npm link @angular/cli"
                    sh "npm test"
                }
            }
        }
    }
}

// Increment the minor part of a `MAJOR.MINOR.PATCH` semver version.
String bumpMinorVersion(String version) {
    def parts = version.tokenize('.')
    if (parts.size() != 3) {
        error "${version} is not a valid MAJOR.MINOR.PATCH version"
    }
    def newMinorVersion = parts[1].toInteger() + 1

    return "${parts[0]}.${newMinorVersion}.${parts[2]}"
}

// Increment the patch part of a `MAJOR.MINOR.PATCH` semver version.
String bumpPatchVersion(String version) {
    def parts = version.tokenize('.')
    if (parts.size() != 3) {
        error "${version} is not a valid MAJOR.MINOR.PATCH version"
    }
    def newPatchVersion = parts[2].toInteger() + 1

    return "${parts[0]}.${parts[1]}.${newPatchVersion}"
}
