terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
    vercel = {
      source  = "vercel/vercel"
      version = "~> 0.3"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

provider "vercel" {
  api_token = var.vercel_token
}

module "networking" {
  source = "./modules/networking"
}

module "database" {
  source = "./modules/database"
  vpc_id = module.networking.vpc_id
}

module "monitoring" {
  source = "./modules/monitoring"
  vpc_id = module.networking.vpc_id
}