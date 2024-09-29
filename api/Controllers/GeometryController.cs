using locamark.Dtos;
using locamark.Extensions;
using locamark.Interfaces;
using locamark.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Security.Claims;

namespace locamark.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class GeometryController : ControllerBase
    {
        private readonly IGeometryService _geometryService;
        private readonly UserManager<ApplicationUser> _userManager;

        public GeometryController(IGeometryService geometryService, UserManager<ApplicationUser> userManager)
        {
            _geometryService = geometryService;
            _userManager = userManager;
        }

        // GET api/Geometry
        [HttpGet]
        public async Task<ActionResult<List<Geometry>>> GetAll()
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username) ?? throw new BadHttpRequestException("Unauthorize Access");

            var userGeometries = await _geometryService.GetAllGeometriesAsync(appUser);
            return new SuccessResponse(HttpStatusCode.OK, data: userGeometries, success: true);
        }

        // GET api/Geometry/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Geometry>> GetById(long id)
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username) ?? throw new BadHttpRequestException("Unauthorize Access");
            var geometry = await _geometryService.GetGeometryByIdAsync(id, appUser);
            return new SuccessResponse(HttpStatusCode.OK, data: geometry, success: true);
        }

        // POST api/Geometry
        [HttpPost]
        public async Task<ActionResult<Geometry>> Add([FromBody] GeometryDto geometryDto)
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username) ?? throw new BadHttpRequestException("Unauthorize Access");
            var newGeometry = await _geometryService.AddGeometryAsync(geometryDto, appUser);
            return new SuccessResponse(HttpStatusCode.Created, data: newGeometry, success: true);
        }

        // DELETE api/Geometry/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(long id)
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username) ?? throw new BadHttpRequestException("Unauthorize Access");
            await _geometryService.DeleteGeometryAsync(id, appUser);
            return new SuccessResponse(HttpStatusCode.OK, message: "Geometry deleted successfully.", success: true);
        }

        // PUT api/Geometry/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<Geometry>> Update(long id, [FromBody] GeometryDto geometryDto)
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username) ?? throw new BadHttpRequestException("Unauthorize Access");
            var updatedGeometry = await _geometryService.UpdateGeometryAsync(id, geometryDto, appUser);
            return new SuccessResponse(HttpStatusCode.OK, message: "Geometry updated successfully.", data: updatedGeometry, success: true);
        }
    }
}
