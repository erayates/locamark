using locamark.Models;
using Microsoft.AspNetCore.Diagnostics;

namespace locamark.Extensions
{
    public class GlobalExceptionHandler : IExceptionHandler
    {
        public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
        {
            var errorResponse = new ErrorResponse()
            {
                StatusCode = StatusCodes.Status400BadRequest,
                Message = exception.Message,
                Title = "BAD REQUEST"
            };

            httpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
            await httpContext.Response.WriteAsJsonAsync(errorResponse, cancellationToken);
            return true;
        }
    }
}
