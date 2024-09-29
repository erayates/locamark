using locamark.Interfaces;
using locamark.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace locamark.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PointController : ControllerBase
    {
        private readonly IPointService _pointService;

        public PointController(IPointService pointService)
        {
            _pointService = pointService;
        }

        // GET api/Point
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Point>>> GetAll()
        {
            var points = await _pointService.GetAllPointsAsync();
            return new SuccessResponse(HttpStatusCode.OK, data: points, success: true);
        }

        // GET api/Point/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Point>> GetById(long id)
        {
            var point = await _pointService.GetPointByIdAsync(id);
            return new SuccessResponse(HttpStatusCode.OK, data: point, success: true);
        }

        // POST api/Point
        [HttpPost]
        public async Task<ActionResult<Point>> Add(Point point)
        {
            var newPoint = await _pointService.AddPointAsync(point);
            return new SuccessResponse(HttpStatusCode.Created, data: newPoint, success: true);
        }

        // DELETE api/Point/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(long id)
        {
            await _pointService.DeletePointAsync(id);
            return new SuccessResponse(HttpStatusCode.OK, message: "Point deleted successfully.", success: true);
        }

        // PUT api/Point/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<Point>> Update(long id, Point updatedPoint)
        {
            var point = await _pointService.UpdatePointAsync(id, updatedPoint);
            return new SuccessResponse(HttpStatusCode.OK, message: "Point updated successfully.", data: point, success: true);
        }
    }
}
