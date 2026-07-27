#!/bin/bash

set -e

echo "Deleting Kubernetes resources..."

kubectl delete -f k8s/

echo "Cleanup completed."