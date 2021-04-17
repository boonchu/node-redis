#!/bin/bash

kubectl create secret generic docker-secret --namespace jenkins --from-file=.dockerconfigjson=./config-docker.json --type=kubernetes.io/dockerconfigjson

cat <<-ECHO | kubectl create -n jenkins -f -
apiVersion: v1
kind: ConfigMap
metadata:
  name: docker-config
data:
  config.json: |-
    {
       "credsStore": "ecr-login"
    }

---
ECHO
