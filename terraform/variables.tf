variable "aws_region" {
  description = "AWS Region"
  type        = string
  default     = "ap-south-1"
}

variable "environment" {
  description = "Deployment Environment"
  type        = string
  default     = "dev"
}

variable "project_name" {
  description = "Project Name"
  type        = string
  default     = "cloudmart"
}