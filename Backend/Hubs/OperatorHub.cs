using Microsoft.AspNetCore.SignalR;
using AeroRoute_API.Dtos;

namespace AeroRoute_API.Hubs
{
    /// <summary>
    /// SignalR hub for operator dashboard.
    /// </summary>
    public class OperatorHub : Hub
    {
        // Intentionally empty; server pushes EventAlertDto and PulseClusterDto messages
    }
}
