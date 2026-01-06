# 🍦 IceCream Store - Production-Grade Microservices Application

A premium digital platform for handcrafted gourmet ice creams, built with a modern polyglot microservices architecture and a stunning, responsive Next.js frontend.

## 📱 Mobile vs 💻 Laptop UI

The frontend is designed with a **Mobile-First** strategy, ensuring a flawless experience across all devices.

### Mobile Experience (Phones)
- **Bottom Navigation**: Easy thumb-reach navigation for core features (Home, Catalog, Cart, Profile).
- **Single-Column Grid**: Optimized layout for vertical scrolling.
- **Large Tap Targets**: All buttons and interactive elements are minimum 44x44px for easy touch interaction.
- **Swipe-Friendly**: Smooth Framer Motion animations for transitions.

### Laptop & Desktop Experience
- **Top Sticky Navbar**: Desktop-optimized navigation with quick search and user actions.
- **Multi-Column Catalog**: Responsive grid that scales up to 4 columns on large screens.
- **Hover Interactions**: Subtle micro-animations and scale effects on product cards.
- **Glassmorphism**: Premium frosted-glass effects for modals and overlays.
- **Admin Sidebar**: Comprehensive dashboard for business management.

## 🏗️ Architecture Overview

The application follows a **Decoupled Microservices Architecture**:

1.  **API Gateway (.NET 8)**: Single entry point using YARP Reverse Proxy. Handles CORS and routing.
2.  **Auth Service (Java/Spring Boot)**: Secure authentication using JWT and BCrypt.
3.  **User Service (Java/Spring Boot)**: Manages customer profiles and preferences.
4.  **Product Service (Python/FastAPI)**: High-performance catalog management with MongoDB.
5.  **Order Service (Java/Spring Boot)**: Orchestrates the ordering lifecycle.
6.  **Payment Service (.NET 8)**: Processes mock payments with MySQL persistence.
7.  **Inventory Service (Java/Spring Boot)**: Real-time stock tracking with MySQL.
8.  **Notification Service (Python/FastAPI)**: Asynchronous alerts and emails.
9.  **Admin Service (.NET 8)**: Internal business operations management.

## 🛠️ Technology Stack

- **Frontend**: Next.js 14+, TypeScript, Tailwind CSS, Framer Motion, Lucide React.
- **Backend**: Java 17 (Spring Boot 3), .NET 8 (ASP.NET Core), Python 3.11 (FastAPI).
- **Persistence**: PostgreSQL (Auth, User, Order), MySQL (Payment, Inventory, Admin), MongoDB (Product, Notification).
- **Containerization**: Docker & Docker Compose.

## 🚀 How to Run Locally

### Prerequisites
- Docker & Docker Compose installed.

### Steps
1.  **Clone the repository**:
    ```bash
    git clone <repo-url>
    cd icecream-store
    ```

2.  **Start all services**:
    ```bash
    docker-compose up --build
    ```

3.  **Access the application**:
    - **Frontend**: `http://localhost:3000`
    - **API Gateway**: `http://localhost:8080`
    - **Admin Dashboard**: `http://localhost:3000/admin`

### Troubleshooting
- If `docker-compose up --build` fails during the `admin-service` image build with an error like:
  ```text
  /src/AdminService.csproj : error NU1605: Detected package downgrade: MySqlConnector from 2.3.5 to 2.0.0
  ```
  the Dockerfile has been updated to pin `MySqlConnector` to `2.3.5` and upgrade `Npgsql` to `7.0.5` during the build stage to resolve the issue. You can re-run the build after pulling the latest changes.

- General troubleshooting tips:
  ```bash
  docker-compose logs -f [service-name]
  docker-compose down && docker-compose up -d --build
  ```

## 🖼️ AI-Generated Images

Product images are generated using professional food photography prompts:
> *"Ultra-realistic strawberry ice cream scoop, studio lighting, premium food photography, 4K, macro shot, creamy texture."*

## 📁 Project Structure

```text
icecream-store/
├── frontend-nextjs/           # Next.js App Router Frontend
├── api-gateway-dotnet/        # .NET 8 API Gateway
├── auth-service-java/         # Java Auth Microservice
├── user-service-java/         # Java User Microservice
├── product-service-python/    # Python Product Microservice
├── order-service-java/        # Java Order Microservice
├── payment-service-dotnet/    # .NET Payment Microservice
├── inventory-service-java/    # Java Inventory Microservice
├── notification-service-python/# Python Notification Microservice
├── admin-service-dotnet/      # .NET Admin Microservice
├── docker-compose.yml         # Container Orchestration
└── README.md                  # Documentation
```
