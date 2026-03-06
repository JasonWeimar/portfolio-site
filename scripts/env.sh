#!/usr/bin/env bash
# scripts/env.sh
# --------------
# Loads environment variables for the Profile Website AWS deploy workflow.
#
# Usage:
#   source scripts/env.sh
#
# IMPORTANT:
# - Do NOT store AWS secrets here.
# - Secrets live in ~/.aws/credentials under the CLI profile.

export AWS_PROFILE="profile-site"
export AWS_REGION="us-west-1"

# Must be globally unique across all AWS accounts.
# Use a clear naming scheme.
export SITE_BUCKET="profile-site-jasonweimar-prod"

# Set these after CloudFront is created:
export CF_DIST_ID="E31ODDXMPI1PQ9"
export CF_DOMAIN="d2f3nky5amv011.cloudfront.net"
