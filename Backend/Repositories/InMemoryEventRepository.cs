using System.Collections.Concurrent;

namespace AeroRoute_API.Repositories
{
    public class InMemoryEventRepository : IEventRepository
    {
        private readonly ConcurrentDictionary<int, TimelineEvent> _events = new();
        private readonly ConcurrentDictionary<int, TransitPulse> _pulses = new();
        private int _eventId = 0;
        private int _pulseId = 0;

        public Task AddTimelineEventAsync(TimelineEvent ev)
        {
            var id = Interlocked.Increment(ref _eventId);
            ev.Id = id;
            _events[id] = ev;
            return Task.CompletedTask;
        }

        public Task AddTransitPulseAsync(TransitPulse pulse)
        {
            var id = Interlocked.Increment(ref _pulseId);
            pulse.Id = id;
            _pulses[id] = pulse;
            return Task.CompletedTask;
        }

        public Task<IEnumerable<TimelineEvent>> GetUpcomingEventsAsync(System.DateTime from, System.TimeSpan within)
        {
            var to = from + within;
            var list = _events.Values.Where(e => e.EndTime >= from && e.EndTime <= to).ToArray();
            return Task.FromResult<IEnumerable<TimelineEvent>>(list);
        }

        public Task<IEnumerable<TransitPulse>> GetRecentPulsesAsync(System.DateTime since)
        {
            var list = _pulses.Values.Where(p => p.Timestamp >= since).ToArray();
            return Task.FromResult<IEnumerable<TransitPulse>>(list);
        }

        public Task<IEnumerable<TimelineEvent>> GetAllTimelineEventsAsync()
        {
            var list = _events.Values.OrderBy(e => e.EndTime).ToArray();
            return Task.FromResult<IEnumerable<TimelineEvent>>(list);
        }

        public Task<IEnumerable<TransitPulse>> GetRecentPulsesAsync()
        {
            var since = DateTime.UtcNow.AddMinutes(-5);
            return GetRecentPulsesAsync(since);
        }

        public Task<IEnumerable<PulseCluster>> GetActiveClustersAsync()
        {
            var since = DateTime.UtcNow.AddMinutes(-3);
            var pulses = _pulses.Values.Where(p => p.Timestamp >= since).ToArray();

            // naive clustering: group by rounded lat/lon to 3 decimals (~100m) and sum counts
            var clusters = pulses.GroupBy(p => (Lat: Math.Round(p.Latitude, 3), Lon: Math.Round(p.Longitude, 3)))
                .Select(g => new PulseCluster { Latitude = g.Key.Lat, Longitude = g.Key.Lon, PulseCount = g.Sum(p => p.Count) })
                .Where(c => c.PulseCount >= 20)
                .ToArray();

            return Task.FromResult<IEnumerable<PulseCluster>>(clusters);
        }
    }
}
