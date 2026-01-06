# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["IceCreamGateway.csproj", "./"]
RUN dotnet restore "IceCreamGateway.csproj"
COPY . .
RUN dotnet publish "IceCreamGateway.csproj" -c Release -o /app/publish

# Run stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 8080
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
ENTRYPOINT ["dotnet", "IceCreamGateway.dll"]
