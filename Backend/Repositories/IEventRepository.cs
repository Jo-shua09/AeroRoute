using System.Collections.Generic;
using System.Threading.Tasks;

namespace AeroRoute_API.Repositories
{
    /// <summary>
    /// EF Core-ready entity for timeline events. Kept simple for MVP.
    /// </summary>
    public class TimelineEvent
    {
        public int Id { get; set; }
        public string EventName { get; set; } = string.Empty;
        public string LocationZone { get; set; } = string.Empty;
        public System.DateTime EndTime { get; set; }
        public int EstimatedCrowd { get; set; }
    }

    /// <summary>
    /// EF Core-ready entity for transit pulses.
    /// </summary>
    public class TransitPulse
    {
        public int Id { get; set; }
        public System.DateTime Timestamp { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public int Count { get; set; }
    }

    public class PulseCluster
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public int PulseCount { get; set; }
    }

    public interface IEventRepository
    {
        Task<IEnumerable<TimelineEvent>> GetUpcomingEventsAsync(System.DateTime from, System.TimeSpan within);
        Task AddTimelineEventAsync(TimelineEvent ev);
        Task AddTransitPulseAsync(TransitPulse pulse);
        Task<IEnumerable<TransitPulse>> GetRecentPulsesAsync(System.DateTime since);

        // New API surface
        Task<IEnumerable<TimelineEvent>> GetAllTimelineEventsAsync();
        Task<IEnumerable<TransitPulse>> GetRecentPulsesAsync();
        Task<IEnumerable<PulseCluster>> GetActiveClustersAsync();
    }
}
