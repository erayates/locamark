using locamark.Dtos;
using locamark.Dtos.Account;
using locamark.Interfaces;
using locamark.Models;
using locamark.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace locamark.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IAdminService _adminService;

        public AdminController(UserManager<ApplicationUser> userManager, IAdminService adminService)
        {
            _userManager = userManager;
            _adminService = adminService;
        }

        // GET: api/admin/users
        [HttpGet("users")]
        public async Task<ActionResult<List<ApplicationUser>>> GetAllUsers()
        {
            var users = await _adminService.GetAllUsersAsync();
            return new SuccessResponse(HttpStatusCode.OK, data: users, success: true);
        }

        // GET: api/admin/users/:id
        [HttpGet("users/{id}")]
        public async Task<ActionResult<ApplicationUser>> GetUserById(string id)
        {
            var user = await _adminService.GetUserByIdAsync(id);
            return new SuccessResponse(HttpStatusCode.OK, data: user, success: true);
        }


        // PUT: api/admin/users/{id}
        [HttpPut("users/{id}")]
        public async Task<ActionResult<ApplicationUser>> UpdateUser(string id, UpdateUserDto userDto)
        {
            var user = await _adminService.UpdateUserAsync(id, userDto);
            return new SuccessResponse(HttpStatusCode.OK, data: user, success: true);
            
        }

        // DELETE: api/admin/users/{id}
        [HttpDelete("users/{id}")]
        public async Task<ActionResult> DeleteUser(string id)
        {
            await _adminService.DeleteUserAsync(id);
            return new SuccessResponse(HttpStatusCode.OK, message: "Geometry deleted successfully.", success: true);
        }

        // GET: api/admin/geometries
        [HttpGet("geometries")]
        public async Task<ActionResult<List<ApplicationUser>>> GetAllGeometries()
        {
            var geometries = await _adminService.GetAllUsersGeometriesAsync();
            return new SuccessResponse(HttpStatusCode.OK, data: geometries, success: true);
        }


        // GET: api/admin/geometries/{id}
        [HttpGet("geometries/{id}")]
        public async Task<ActionResult<ApplicationUser>> GetGeometryByIdAsync(long id)
        {
            var geometry = await _adminService.GetGeometryByIdAsync(id);
            return new SuccessResponse(HttpStatusCode.OK, data: geometry, success: true);
        }

        // DELETE: api/admin/geometries/{id}
        [HttpDelete("geometries/{id}")]
        public async Task<ActionResult> DeleteGeometry(long id)
        {
            await _adminService.DeleteGeometryAsync(id);
            return new SuccessResponse(HttpStatusCode.OK, message: "Geometry deleted successfully.", success: true);
        }

        // PUT: api/admin/geometries/{id}
        [HttpPut("geometries/{id}")]
        public async Task<ActionResult<ApplicationUser>> UpdateGeometry(long id, GeometryDto geometryDto)
        {
            var geometry = await _adminService.UpdateGeometryAsync(id, geometryDto);
            return new SuccessResponse(HttpStatusCode.OK, data: geometry, success: true);
        }
    }
}
