# CloudMart Architecture

## Infrastructure

- Amazon VPC
- Public & Private Subnets
- Internet Gateway
- NAT Gateway
- Security Groups

## Compute

- Amazon EKS
- Managed Node Groups

## Database

- Amazon RDS MySQL

## Container Registry

- Amazon ECR

## CI/CD

- GitHub Actions

## Monitoring

- CloudWatch
- Prometheus
- Grafana

## Networking

Internet
↓

AWS Load Balancer

↓

NGINX Ingress

↓

Frontend

↓

Backend

↓

Amazon RDS