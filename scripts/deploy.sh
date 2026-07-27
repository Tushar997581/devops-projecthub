#!/bin/bash

set -e

echo "Updating kubeconfig..."

aws eks update-kubeconfig \
  --region ap-south-1 \
  --name cloudmart-eks

echo "Deploying Kubernetes resources..."

kubectl apply -f k8s/

echo "Waiting for Backend..."

kubectl rollout status deployment/backend -n cloudmart

echo "Waiting for Frontend..."

kubectl rollout status deployment/frontend -n cloudmart

echo "Deployment completed successfully."