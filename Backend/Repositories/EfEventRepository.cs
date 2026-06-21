using Microsoft.EntityFrameworkCore;
using AeroRoute_API.Data;

namespace AeroRoute_API.Repositories
{
    public class EfEventRepository : IEventRepository
    {
        private readonly AeroRouteDbContext _db;

        public EfEventRepository(AeroRouteDbContext db)
        {
            _db = db;
        }

        public async Task AddTimelineEventAsync(TimelineEvent ev)
        {
            _db.TimelineEvents.Add(ev);
            await _db.SaveChangesAsync();
        }

        public async Task AddTransitPulseAsync(TransitPulse pulse)
        {
            _db.TransitPulses.Add(pulse);
            await _db.SaveChangesAsync();
        }

        public async Task<IEnumerable<TimelineEvent>> GetUpcomingEventsAsync(System.DateTime from, System.TimeSpan within)
        {
            var to = from + within;
            return await _db.TimelineEvents.Where(e => e.EndTime >= from && e.EndTime <= to).ToListAsync();
        }

        public async Task<IEnumerable<TransitPulse>> GetRecentPulsesAsync(System.DateTime since)
        {
            return await _db.TransitPulses.Where(p => p.Timestamp >= since).ToListAsync();
        }

        public async Task<IEnumerable<TimelineEvent>> GetAllTimelineEventsAsync()
        {
            return await _db.TimelineEvents.OrderBy(e => e.EndTime).ToListAsync();
        }

        public async Task<IEnumerable<TransitPulse>> GetRecentPulsesAsync()
        {
            var since = DateTime.UtcNow.AddMinutes(-5);
            return await GetRecentPulsesAsync(since);
        }

        public async Task<IEnumerable<PulseCluster>> GetActiveClustersAsync()
        {
            var since = DateTime.UtcNow.AddMinutes(-3);
            var pulses = await _db.TransitPulses.Where(p => p.Timestamp >= since).ToListAsync();

            var clusters = pulses.GroupBy(p => (Lat: Math.Round(p.Latitude, 3), Lon: Math.Round(p.Longitude, 3)))
                .Select(g => new PulseCluster { Latitude = g.Key.Lat, Longitude = g.Key.Lon, PulseCount = g.Sum(p => p.Count) })
                .Where(c => c.PulseCount >= 20)
                .ToArray();

            return clusters;
        }
    }
}
