# Common Issues

## Pods Pending

Check:

kubectl describe pod POD_NAME

## Image Pull BackOff

Verify:

- ECR repository
- Image tag
- IAM permissions

## CrashLoopBackOff

Check logs:

kubectl logs POD_NAME

## Database Connection Failed

Verify:

- RDS Security Group
- Environment Variables
- Secrets