namespace AeroRoute_API.Dtos
{
    /// <summary>
    /// DTO sent to operator clients when a scheduled event is approaching its end.
    /// </summary>
    public class EventAlertDto
    {
        public string EventName { get; set; } = string.Empty;
        public string LocationZone { get; set; } = string.Empty;
        public int MinutesRemaining { get; set; }
    }

    /// <summary>
    /// DTO sent to operator clients when a pulse cluster is detected.
    /// </summary>
    public class PulseClusterDto
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public int PulseCount { get; set; }
    }
}
