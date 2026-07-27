locals {
  name = "${var.project_name}-${var.environment}"

  common_tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}

##############################################
# DB Subnet Group
##############################################

resource "aws_db_subnet_group" "this" {
  name       = "${local.name}-db-subnet-group"
  subnet_ids = var.private_subnet_ids

  tags = merge(local.common_tags, {
    Name = "${local.name}-db-subnet-group"
  })
}

##############################################
# PostgreSQL
##############################################

resource "aws_db_instance" "this" {

  identifier = "${local.name}-postgres"

  engine         = "postgres"
  engine_version = "17"

  instance_class = var.instance_class

  allocated_storage = var.allocated_storage
  storage_type      = "gp3"
  storage_encrypted = true

  db_name  = var.db_name
  username = var.db_username
  password = var.db_password

  port = 5432

  db_subnet_group_name   = aws_db_subnet_group.this.name
  vpc_security_group_ids = [var.rds_security_group]

  publicly_accessible = false

  backup_retention_period = 7

  skip_final_snapshot = true

  deletion_protection = false

  tags = merge(local.common_tags, {
    Name = "${local.name}-postgres"
  })
}