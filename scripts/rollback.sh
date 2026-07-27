#!/bin/bash

set -e

echo "Rolling back backend..."

kubectl rollout undo deployment/backend -n cloudmart

echo "Rolling back frontend..."

kubectl rollout undo deployment/frontend -n cloudmart

echo "Rollback completed."