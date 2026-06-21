using AeroRoute_API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// === PORT CONFIGURATION FOR RAILWAY / AZURE (ADD THIS RIGHT AFTER CreateBuilder) ===
builder.WebHost.UseUrls(
    $"http://0.0.0.0:{Environment.GetEnvironmentVariable("PORT") ?? "8080"}"
);
// =================================================================================

// Add services to the container.
builder.Services.AddControllers();
// SignalR for real-time operator notifications
builder.Services.AddSignalR();
// Repository - default to EF Core implementation; connection string from configuration
builder.Services.AddDbContext<AeroRouteDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<AeroRoute_API.Repositories.IEventRepository, AeroRoute_API.Repositories.EfEventRepository>();
// Background service that ingests the timeline and fires notifications
//builder.Services.AddHostedService<AeroRoute_API.Services.TimelineIngestionService>();

// CORS - allow any origin for frontend development (tighten in production!)
var allowFrontendPolicy = "AllowFrontendDev";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: allowFrontendPolicy, policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// Use existing AddOpenApi helper
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();

// Serve static files (wwwroot)
app.UseStaticFiles();

app.UseCors(allowFrontendPolicy);

app.UseAuthorization();

// Map the OpenAPI/Swagger UI
app.MapOpenApi();

app.MapControllers();
// Map SignalR hub used by the operator dashboard
app.MapHub<AeroRoute_API.Hubs.OperatorHub>("/operatorHub");

// Initialize database and seed data
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var db = services.GetRequiredService<AeroRoute_API.Data.AeroRouteDbContext>();
        await AeroRoute_API.Data.DbInitializer.InitializeAsync(db);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred initializing the DB.");
    }
}

app.Run();