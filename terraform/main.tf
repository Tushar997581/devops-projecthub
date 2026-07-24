##############################################
# VPC
##############################################

module "vpc" {
  source = "./modules/vpc"

  project_name = var.project_name
  environment  = var.environment
  cluster_name = var.cluster_name

  vpc_cidr             = var.vpc_cidr
  availability_zones   = var.availability_zones
  public_subnet_cidrs  = var.public_subnet_cidrs
  private_subnet_cidrs = var.private_subnet_cidrs
}

##############################################
# Security Groups
##############################################

module "security_groups" {
  source = "./modules/security-groups"

  project_name = var.project_name
  environment  = var.environment

  vpc_id = module.vpc.vpc_id
}

##############################################
# ECR
##############################################

module "ecr" {
  source = "./modules/ecr"

  project_name = var.project_name
  environment  = var.environment
}

##############################################
# IAM
##############################################

module "iam" {
  source = "./modules/iam"

  project_name = var.project_name
  environment  = var.environment
}

##############################################
# RDS
##############################################

module "rds" {
  source = "./modules/rds"

  project_name = var.project_name
  environment  = var.environment

  private_subnet_ids = module.vpc.private_subnet_ids
  rds_security_group = module.security_groups.rds_security_group_id

  db_password = var.db_password
}

##############################################
# EKS
##############################################

module "eks" {
  source = "./modules/eks"

  project_name = var.project_name
  environment  = var.environment
  cluster_name = var.cluster_name

  vpc_id             = module.vpc.vpc_id
  subnet_ids         = module.vpc.private_subnet_ids

  node_security_group = module.security_groups.eks_node_security_group_id

  cluster_role_arn = module.iam.eks_cluster_role_arn
  node_role_arn    = module.iam.eks_node_role_arn
}