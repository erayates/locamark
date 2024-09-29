using locamark.Dtos;
using locamark.Dtos.Account;
using locamark.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace locamark.Interfaces
{
    public interface IAdminService
    {
        Task<IEnumerable<ApplicationUser>> GetAllUsersAsync();
        Task<ApplicationUser> GetUserByIdAsync(string id);
        Task<ApplicationUser> UpdateUserAsync(string id, UpdateUserDto updatedUser);
        Task DeleteUserAsync(string id);
        Task<List<Geometry>> GetAllUsersGeometriesAsync();
        Task<Geometry> GetGeometryByIdAsync(long id);
        Task DeleteGeometryAsync(long id);
        Task<Geometry> UpdateGeometryAsync(long id, GeometryDto geometryDto);
    }
}
