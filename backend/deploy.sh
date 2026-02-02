#!/bin/bash
# Deployment script for Silver Saheli Backend
# Usage: ./deploy.sh [heroku|aws|docker]

set -e

DEPLOY_TARGET=${1:-heroku}

echo "🚀 Deploying Silver Saheli Backend..."
echo "Target: $DEPLOY_TARGET"

case $DEPLOY_TARGET in
  heroku)
    echo "📦 Deploying to Heroku..."
    heroku login
    heroku create silver-saheli-backend --buildpack heroku/python
    heroku addons:create heroku-postgresql:hobby-dev
    heroku config:set ENVIRONMENT=production
    git push heroku main
    echo "✅ Heroku deployment complete!"
    echo "App URL: https://silver-saheli-backend.herokuapp.com"
    ;;
    
  aws)
    echo "📦 Deploying to AWS Elastic Beanstalk..."
    eb init -p python-3.9 silver-saheli-backend
    eb create silver-saheli-prod
    eb setenv ENVIRONMENT=production
    eb deploy
    echo "✅ AWS deployment complete!"
    ;;
    
  docker)
    echo "🐳 Building Docker image..."
    docker build -t silver-saheli-backend:latest .
    docker tag silver-saheli-backend:latest silver-saheli-backend:$(date +%Y%m%d)
    echo "✅ Docker image built successfully!"
    echo "Run: docker run -p 5050:5050 silver-saheli-backend:latest"
    ;;
    
  *)
    echo "❌ Unknown deployment target: $DEPLOY_TARGET"
    echo "Usage: ./deploy.sh [heroku|aws|docker]"
    exit 1
    ;;
esac

echo "✨ Deployment complete!"
