using Microsoft.AspNetCore.Mvc;
using AeroRoute_API.Repositories;

namespace AeroRoute_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OperatorController : ControllerBase
    {
        private readonly IEventRepository _repo;

        public OperatorController(IEventRepository repo)
        {
            _repo = repo;
        }

        /// <summary>
        /// Submit a list of timeline events (operator input or file import).
        /// </summary>
        [HttpPost("timeline")]
        public async Task<IActionResult> PostTimeline([FromBody] IEnumerable<TimelineEventInput> events)
        {
            foreach (var e in events)
            {
                var ev = new Repositories.TimelineEvent
                {
                    EventName = e.EventName,
                    LocationZone = e.LocationZone,
                    EndTime = e.EndTime.ToUniversalTime(),
                    EstimatedCrowd = e.EstimatedCrowd
                };
                await _repo.AddTimelineEventAsync(ev);
            }
            return Ok();
        }

        /// <summary>
        /// Submit a transit pulse from a commuter device.
        /// </summary>
        [HttpPost("pulse")]
        public async Task<IActionResult> PostPulse([FromBody] TransitPulseInput pulse)
        {
            var p = new Repositories.TransitPulse
            {
                Timestamp = pulse.Timestamp.ToUniversalTime(),
                Latitude = pulse.Latitude,
                Longitude = pulse.Longitude,
                Count = pulse.Count
            };
            await _repo.AddTransitPulseAsync(p);
            return Ok();
        }

        /// <summary>
        /// Get all timeline events.
        /// </summary>
        [HttpGet("timeline")]
        public async Task<IActionResult> GetTimeline()
        {
            var list = await _repo.GetAllTimelineEventsAsync();
            return Ok(list);
        }

        /// <summary>
        /// Get recent transit pulses (last 5 minutes).
        /// </summary>
        [HttpGet("pulses")]
        public async Task<IActionResult> GetPulses()
        {
            var list = await _repo.GetRecentPulsesAsync();
            return Ok(list);
        }

        /// <summary>
        /// Get currently active pulse clusters detected from recent pulses.
        /// </summary>
        [HttpGet("clusters")]
        public async Task<IActionResult> GetClusters()
        {
            var list = await _repo.GetActiveClustersAsync();
            return Ok(list);
        }

        public record TimelineEventInput(string EventName, string LocationZone, DateTime EndTime, int EstimatedCrowd);
        public record TransitPulseInput(DateTime Timestamp, double Latitude, double Longitude, int Count);
    }
}
