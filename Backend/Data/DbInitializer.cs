using AeroRoute_API.Repositories;
using Microsoft.EntityFrameworkCore;

namespace AeroRoute_API.Data
{
    public static class DbInitializer
    {
        public static async Task InitializeAsync(AeroRouteDbContext context)
        {
            // Apply any pending migrations - ensures database schema is up to date
            await context.Database.MigrateAsync();

            // Seed initial data only if tables are empty
            if (!context.TimelineEvents.Any())
            {
                context.TimelineEvents.Add(new TimelineEvent { EventName = "Opening Ceremony", LocationZone = "Main Pavilion", EndTime = DateTime.UtcNow.AddHours(2), EstimatedCrowd = 50000 });
                context.TimelineEvents.Add(new TimelineEvent { EventName = "Closing Prayer", LocationZone = "Main Pavilion", EndTime = DateTime.UtcNow.AddHours(8), EstimatedCrowd = 30000 });
            }

            if (!context.TransitPulses.Any())
            {
                var now = DateTime.UtcNow;
                context.TransitPulses.Add(new TransitPulse { Timestamp = now.AddMinutes(-1), Latitude = 40.0, Longitude = -74.0, Count = 25 });
            }

            await context.SaveChangesAsync();
        }
    }
}
