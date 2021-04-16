#!/bin/bash 

kubectl run redis --image redis --dry-run=client -o yaml \
    --requests='cpu=100m,memory=128Mi' --tty=false \
    --restart=OnFailure --port=6379 --limits='cpu=200m,memory=250Mi' \
| kubectl apply -n jenkins -f -
kubectl wait --for=condition=Ready pod/redis
kubectl expose pod/redis --dry-run=client -o yaml \
| kubectl apply -n jenkins -f -
