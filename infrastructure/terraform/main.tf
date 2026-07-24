terraform {
  required_version = ">= 1.5.0"
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "website" {
  bucket = "devops-projecthub-website"
}
