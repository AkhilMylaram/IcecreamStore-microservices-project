using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Text.Json;
using System.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);

// Add YARP services
builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

// Http client for talking to auth service
builder.Services.AddHttpClient("auth", client =>
{
    client.BaseAddress = new Uri("http://auth-service:8081");
    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("DefaultPolicy", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("DefaultPolicy");
app.UseRouting();

// Middleware: validate JWT (when present) and inject user info headers; enforce auth on state-changing API routes
app.Use(async (context, next) =>
{
    var path = context.Request.Path.Value ?? string.Empty;

    // Skip auth middleware for auth endpoints and health checks
    if (path.StartsWith("/api/auth") || path.StartsWith("/health"))
    {
        await next();
        return;
    }

    var authHeader = context.Request.Headers["Authorization"].FirstOrDefault();
    bool hasValidUser = false;
    if (!string.IsNullOrEmpty(authHeader))
    {
        try
        {
            var client = context.RequestServices.GetRequiredService<IHttpClientFactory>().CreateClient("auth");
            client.DefaultRequestHeaders.Remove("Authorization");
            client.DefaultRequestHeaders.Add("Authorization", authHeader);
            var resp = await client.GetAsync("/api/auth/me");
            if (resp.IsSuccessStatusCode)
            {
                var content = await resp.Content.ReadAsStringAsync();
                using var doc = JsonDocument.Parse(content);
                var root = doc.RootElement;
                if (root.ValueKind == JsonValueKind.Object)
                {
                    if (root.TryGetProperty("id", out var idProp))
                        context.Request.Headers["X-User-Id"] = idProp.ToString();
                    if (root.TryGetProperty("email", out var emailProp))
                        context.Request.Headers["X-User-Email"] = emailProp.GetString();
                    if (root.TryGetProperty("role", out var roleProp))
                        context.Request.Headers["X-User-Role"] = roleProp.GetString();
                    hasValidUser = true;
                }
            }
        }
        catch (Exception ex)
        {
            // Log and continue; we'll enforce auth for protected routes below
            Console.WriteLine($"Auth validation failed: {ex.Message}");
        }
    }

    // Enforce authentication for non-GET API calls that change state
    if (context.Request.Method != "GET" && path.StartsWith("/api/"))
    {
        if (!hasValidUser)
        {
            context.Response.StatusCode = 401;
            await context.Response.WriteAsync("Unauthorized");
            return;
        }
    }

    await next();
});

app.MapReverseProxy();

app.MapGet("/", () => "Ice Cream Store API Gateway is Running.");
app.MapGet("/health", () => Results.Ok(new { status = "healthy", service = "api-gateway" }));

app.Run();
