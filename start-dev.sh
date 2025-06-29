#!/bin/bash

# Build and start the containers
docker-compose -f docker-compose.dev.yml up -d

# Wait for the database to be ready
echo "Waiting for database to be ready..."
sleep 10

# Run database migrations
docker-compose -f docker-compose.dev.yml exec web npx prisma migrate dev

# Show the logs
docker-compose -f docker-compose.dev.yml logs -f web