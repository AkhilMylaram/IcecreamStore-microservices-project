using Microsoft.EntityFrameworkCore;
using PaymentService.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Add DbContext with specific server version to avoid auto-detection during startup
builder.Services.AddDbContext<PaymentDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.Parse("8.0.21")));

builder.Services.AddControllers();

var app = builder.Build();

app.UseAuthorization();
app.MapControllers();

// Ensure database is created with retry logic after app is built
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<PaymentDbContext>();

    // Retry database connection
    int maxRetries = 10;
    int retryCount = 0;
    Exception lastException = null;

    while (retryCount < maxRetries)
    {
        try
        {
            context.Database.EnsureCreated(); // Creates the database if it doesn't exist
            Console.WriteLine("Database created successfully.");
            break; // Success, exit the loop
        }
        catch (Exception ex)
        {
            lastException = ex;
            retryCount++;
            Console.WriteLine($"Attempt {retryCount} failed to connect to database: {ex.Message}");

            if (retryCount >= maxRetries)
            {
                Console.WriteLine($"Max retries reached. Last error: {lastException.Message}");
                break; // Don't throw, let the app start and handle errors at runtime
            }

            System.Threading.Thread.Sleep(5000); // Wait 5 seconds before retrying
        }
    }
}

app.Run();
