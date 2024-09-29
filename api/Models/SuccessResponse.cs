using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Collections.Generic;

namespace locamark.Models
{
    public class SuccessResponse : ActionResult
    {
        private readonly HttpStatusCode _status;
        private readonly string _message;
        private readonly object _data;
        private readonly bool _success;

        public SuccessResponse(HttpStatusCode status, string message = null, object data = null, bool success = true)
        {
            _status = status;
            _message = message;
            _data = data;
            _success = success;
        }

        public override async Task ExecuteResultAsync(ActionContext context)
        {
            var response = new Dictionary<string, object>
            {
                { "statusCode", _status },
                { "success", _success }
            };

            if (!string.IsNullOrEmpty(_message))
                response.Add("message", _message);

            if (_data != null)
                response.Add("data", _data);

            var objectResult = new ObjectResult(response)
            {
                StatusCode = (int)_status
            };

            await objectResult.ExecuteResultAsync(context);
        }
    }
}
