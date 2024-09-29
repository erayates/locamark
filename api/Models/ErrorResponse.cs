using System.Text.Json;

namespace locamark.Models
{
    public class ErrorResponse
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public string? Title { get; set; }
    }
}
