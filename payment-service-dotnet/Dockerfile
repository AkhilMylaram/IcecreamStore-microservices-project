# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["PaymentService.csproj", "./"]
RUN dotnet restore "PaymentService.csproj"
COPY . .
RUN dotnet publish "PaymentService.csproj" -c Release -o /app/publish

# Run stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 8083
ENTRYPOINT ["dotnet", "PaymentService.dll"]
