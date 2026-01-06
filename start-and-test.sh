#!/bin/bash

# Start and Test Script for IcecreamStore Microservices
# This script starts all services and runs comprehensive tests

echo "🍦 IcecreamStore Microservices - Start & Test Script"
echo "===================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if a service is running
check_service() {
    local service_name=$1
    local url=$2
    local max_attempts=$3
    
    echo -n "Checking $service_name... "
    
    for i in $(seq 1 $max_attempts); do
        if curl -s "$url" > /dev/null; then
            echo -e "${GREEN}✓ Running${NC}"
            return 0
        fi
        sleep 2
    done
    
    echo -e "${RED}✗ Not responding${NC}"
    return 1
}

# Function to wait for service
wait_for_service() {
    local service_name=$1
    local url=$2
    local max_attempts=$3
    
    echo "Waiting for $service_name to be ready..."
    
    for i in $(seq 1 $max_attempts); do
        if curl -s "$url" > /dev/null; then
            echo -e "${GREEN}$service_name is ready!${NC}"
            return 0
        fi
        echo "Attempt $i/$max_attempts..."
        sleep 3
    done
    
    echo -e "${RED}$service_name failed to start${NC}"
    return 1
}

# Check prerequisites
echo -e "\n${YELLOW}1. Checking prerequisites...${NC}"
if ! command -v docker &> /dev/null; then
    echo -e "${RED}✗ Docker is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Docker is installed${NC}"

if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}✗ Docker Compose is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Docker Compose is installed${NC}"

# Stop any existing containers
echo -e "\n${YELLOW}2. Cleaning up existing containers...${NC}"
docker-compose down 2>/dev/null || true

# Start all services
echo -e "\n${YELLOW}3. Starting all services...${NC}"
echo "This may take a few minutes on first run (building images)..."
docker-compose up -d --build

if [ $? -ne 0 ]; then
    echo -e "${RED}✗ Failed to start services${NC}"
    exit 1
fi

echo -e "${GREEN}✓ All services started${NC}"

# Wait for services to be ready
echo -e "\n${YELLOW}4. Waiting for services to be ready...${NC}"

wait_for_service "PostgreSQL" "http://localhost:5432" 10
wait_for_service "MySQL" "http://localhost:3306" 10
wait_for_service "MongoDB" "http://localhost:27017" 10
wait_for_service "API Gateway" "http://localhost:8080" 15
wait_for_service "Auth Service" "http://localhost:8081/api/auth/validate" 15
wait_for_service "User Service" "http://localhost:8082/api/users/test" 15
wait_for_service "Product Service" "http://localhost:8000" 15
wait_for_service "Frontend" "http://localhost:3000" 20

# Run comprehensive tests
echo -e "\n${YELLOW}5. Running comprehensive authentication tests...${NC}"
if command -v node &> /dev/null; then
    node comprehensive-test.js
else
    echo -e "${YELLOW}⚠ Node.js not available, skipping automated tests${NC}"
    echo "You can run tests manually with: node comprehensive-test.js"
fi

# Show service status
echo -e "\n${YELLOW}6. Service Status Summary${NC}"
echo "===================================================="
docker-compose ps

echo -e "\n${GREEN}✅ Setup complete!${NC}"
echo -e "\n${YELLOW}Access URLs:${NC}"
echo "  Frontend:    http://localhost:3000"
echo "  API Gateway: http://localhost:8080"
echo "  Auth Service: http://localhost:8081"
echo "  User Service: http://localhost:8082"
echo "  Product Service: http://localhost:8000"

echo -e "\n${YELLOW}To view logs:${NC}"
echo "  docker-compose logs -f [service-name]"

echo -e "\n${YELLOW}To stop services:${NC}"
echo "  docker-compose down"

echo -e "\n${YELLOW}To run tests again:${NC}"
echo "  node comprehensive-test.js"