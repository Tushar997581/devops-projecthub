##############################################
# VPC
##############################################

output "vpc_id" {
  value = module.vpc.vpc_id
}

output "vpc_cidr" {
  value = module.vpc.vpc_cidr
}

output "public_subnet_ids" {
  value = module.vpc.public_subnet_ids
}

output "private_subnet_ids" {
  value = module.vpc.private_subnet_ids
}

output "internet_gateway_id" {
  value = module.vpc.internet_gateway_id
}

output "nat_gateway_id" {
  value = module.vpc.nat_gateway_id
}

##############################################
# Security Groups
##############################################

output "alb_security_group_id" {
  value = module.security_groups.alb_security_group_id
}

output "eks_node_security_group_id" {
  value = module.security_groups.eks_node_security_group_id
}

output "rds_security_group_id" {
  value = module.security_groups.rds_security_group_id
}

##############################################
# ECR
##############################################

output "frontend_repository_url" {
  value = module.ecr.frontend_repository_url
}

output "backend_repository_url" {
  value = module.ecr.backend_repository_url
}

##############################################
# IAM
##############################################

output "eks_cluster_role_arn" {
  value = module.iam.eks_cluster_role_arn
}

output "eks_node_role_arn" {
  value = module.iam.eks_node_role_arn
}

##############################################
# RDS
##############################################

output "database_endpoint" {
  value = module.rds.database_endpoint
}

output "database_port" {
  value = module.rds.database_port
}

output "database_name" {
  value = module.rds.database_name
}

##############################################
# EKS
##############################################

output "cluster_name" {
  value = module.eks.cluster_name
}

output "cluster_endpoint" {
  value = module.eks.cluster_endpoint
}

output "cluster_certificate_authority_data" {
  value = module.eks.cluster_certificate_authority_data
}