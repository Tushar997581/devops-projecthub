output "database_endpoint" {
  value = aws_db_instance.this.address
}

output "database_port" {
  value = aws_db_instance.this.port
}

output "database_name" {
  value = aws_db_instance.this.db_name
}

output "database_identifier" {
  value = aws_db_instance.this.identifier
}