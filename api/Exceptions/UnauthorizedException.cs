using locamark.Models;
using Microsoft.AspNetCore.Diagnostics;

namespace locamark.Exceptions
{
    public class UnauthorizedException : IExceptionHandler
    {
        public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
        {
            if (exception is UnauthorizedAccessException)
            {
                {
                    var errorResponse = new ErrorResponse()
                    {
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = exception.Message,
                        Title = "UNAUTHORIZED"

                    };
                    httpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    httpContext.Response.ContentType = "application/json";
                    await httpContext.Response.WriteAsJsonAsync(errorResponse, cancellationToken);
                    return true;
                }
            }
            return false;
        }
    }
}
