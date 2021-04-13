#!/usr/bin/env groovy

pipeline {
    agent {
        kubernetes {
            yaml '''
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: shell
    image: localhost:5000/node:custom
    command:
    - sleep
    args:
    - infinity
'''
            defaultContainer 'shell'
        }
    }
    stages {
        
        stage('SCM Get Code') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], userRemoteConfigs: [[url: 'https://github.com/boonchu/node-redis.git']]])
            }
        }
        
        stage('Code Analysis') {
            steps {
                sh "npm install --production --unsafe-perm"
                sh "npm audit fix"
                sh "npm link @angular/cli"
                sh "npm run lint"
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
