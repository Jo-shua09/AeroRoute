using Microsoft.AspNetCore.SignalR;
using AeroRoute_API.Repositories;
using AeroRoute_API.Dtos;

namespace AeroRoute_API.Services
{
    public class TimelineIngestionService : BackgroundService
    {
        private readonly ILogger<TimelineIngestionService> _logger;
        private readonly IEventRepository _repo;
        private readonly IHubContext<Hubs.OperatorHub> _hub;

        public TimelineIngestionService(ILogger<TimelineIngestionService> logger, IEventRepository repo, IHubContext<Hubs.OperatorHub> hub)
        {
            _logger = logger;
            _repo = repo;
            _hub = hub;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Timeline ingestion service started");

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    var now = DateTime.UtcNow;
                    // look 15 minutes ahead
                    var upcoming = await _repo.GetUpcomingEventsAsync(now, TimeSpan.FromMinutes(15));
                    foreach (var ev in upcoming)
                    {
                        // if event.EndTime is within 15 minutes, fire a notification
                        var minutesUntilEnd = (int)Math.Ceiling((ev.EndTime - now).TotalMinutes);
                        if (minutesUntilEnd <= 15 && minutesUntilEnd >= 0)
                        {
                            _logger.LogInformation("Firing alert for event {EventName} at {Location}", ev.EventName, ev.LocationZone);
                            var dto = new EventAlertDto
                            {
                                EventName = ev.EventName,
                                LocationZone = ev.LocationZone,
                                MinutesRemaining = minutesUntilEnd
                            };
                            await _hub.Clients.All.SendAsync("EventAlert", dto);
                        }
                    }

                    // process pulses for dynamic mode using repository helper
                    var clusters = await _repo.GetActiveClustersAsync();
                    foreach (var c in clusters)
                    {
                        _logger.LogInformation("Detected pulse cluster at {Lat},{Lon} count {Count}", c.Latitude, c.Longitude, c.PulseCount);
                        var dto = new PulseClusterDto { Latitude = c.Latitude, Longitude = c.Longitude, PulseCount = c.PulseCount };
                        await _hub.Clients.All.SendAsync("PulseCluster", dto);
                    }

                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error in timeline ingestion");
                }

                await Task.Delay(TimeSpan.FromSeconds(60), stoppingToken);
            }
        }
    }
}
