using Microsoft.EntityFrameworkCore;
using AeroRoute_API.Repositories;

namespace AeroRoute_API.Data
{
    public class AeroRouteDbContext : DbContext
    {
        public AeroRouteDbContext(DbContextOptions<AeroRouteDbContext> options) : base(options)
        {
        }

        public DbSet<TimelineEvent> TimelineEvents { get; set; } = null!;
        public DbSet<TransitPulse> TransitPulses { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<TimelineEvent>(b =>
            {
                b.HasKey(e => e.Id);
                b.Property(e => e.EventName).IsRequired();
                b.Property(e => e.LocationZone).IsRequired();
            });

            modelBuilder.Entity<TransitPulse>(b =>
            {
                b.HasKey(p => p.Id);
            });
        }
    }
}
