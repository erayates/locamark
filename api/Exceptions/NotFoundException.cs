using locamark.Models;
using Microsoft.AspNetCore.Diagnostics;

namespace locamark.Exceptions
{
    public class NotFoundException : IExceptionHandler
    {
        public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
        {
            if(exception is KeyNotFoundException)
            {
                {
                    var errorResponse = new ErrorResponse()
                    {
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = exception.Message,
                        Title = "NOT FOUND"

                    };
                    httpContext.Response.StatusCode = StatusCodes.Status404NotFound;
                    httpContext.Response.ContentType = "application/json";
                    await httpContext.Response.WriteAsJsonAsync(errorResponse, cancellationToken);
                    return true;
                }
            }
            return false;
        }
    }
}
