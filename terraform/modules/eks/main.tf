module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 21.0"

  name               = local.cluster_name
  kubernetes_version = var.kubernetes_version

  endpoint_public_access  = true
  endpoint_private_access = true

  vpc_id     = var.vpc_id
  subnet_ids = var.private_subnet_ids

  create_cloudwatch_log_group = true

  enable_irsa = true

  authentication_mode = "API_AND_CONFIG_MAP"

  cluster_enabled_log_types = [
    "api",
    "audit",
    "authenticator",
    "controllerManager",
    "scheduler"
  ]

  eks_managed_node_groups = {

    default = {

      instance_types = var.instance_types

      min_size     = var.min_size
      max_size     = var.max_size
      desired_size = var.desired_size

      iam_role_arn = var.eks_node_role_arn

      subnet_ids = var.private_subnet_ids

      vpc_security_group_ids = [
        var.eks_node_security_group_id
      ]

      tags = local.common_tags
    }
  }

  addons = {
    coredns = {}
    kube-proxy = {}
    vpc-cni = {}
    aws-ebs-csi-driver = {}
  }

  tags = local.common_tags
}