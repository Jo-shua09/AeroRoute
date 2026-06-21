using Microsoft.AspNetCore.Mvc;

namespace AeroRoute_API.Controllers
{
    [ApiController]
    public class HealthController : ControllerBase
    {
        /// <summary>
        /// Simple health endpoint for readiness checks.
        /// </summary>
        [HttpGet("/health")]
        public IActionResult GetHealth()
        {
            var result = new { status = "Healthy", timestamp = DateTime.UtcNow.ToString("o") };
            return Ok(result);
        }
    }
}
