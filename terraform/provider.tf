provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "CloudMart"
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}