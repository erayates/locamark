using locamark.Dtos;
using locamark.Dtos.Account;
using locamark.Interfaces;
using locamark.Models;
using locamark.Repositories;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace locamark.Services
{
    public class AdminService : IAdminService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUnitOfWork _unitOfWork;

        public AdminService(UserManager<ApplicationUser> userManager, IUnitOfWork unitOfWork)
        {
            _userManager = userManager;
            _unitOfWork = unitOfWork;
        }

        // User
        public async Task<IEnumerable<ApplicationUser>> GetAllUsersAsync()
        {
            try
            {
                var users = _userManager.Users;
                return users;
            }
            catch (Exception ex)
            {
                throw new BadHttpRequestException(ex.Message);
            }
        }

        public async Task<ApplicationUser> GetUserByIdAsync(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null) throw new KeyNotFoundException("User not found.");
            return user;
        }

        public async Task<ApplicationUser> UpdateUserAsync(string id,UpdateUserDto updatedUser)
        {
            var user = await this.GetUserByIdAsync(id);

            user.Email = updatedUser.Email;
            user.UserName = updatedUser.UserName;

            await _userManager.UpdateAsync(user);

            return user;
        }

        public async Task DeleteUserAsync(string id)
        {
            var user = await this.GetUserByIdAsync(id);
            await _userManager.DeleteAsync(user);
        }

        // Geometries
        public async Task<List<Geometry>> GetAllUsersGeometriesAsync()
        {
            var repository = _unitOfWork.Repository<Geometry>();
            var geometries = await repository.GetAllAsync();
            return geometries;
        }

        public async Task<Geometry> GetGeometryByIdAsync(long id)
        {
            var repository = _unitOfWork.Repository<Geometry>();
            var geometry = await repository.GetByIdAsync(id);
            return geometry;
        }

        public async Task DeleteGeometryAsync(long id)
        {
            var repository = _unitOfWork.Repository<Geometry>();
            var geometry = await this.GetGeometryByIdAsync(id);
            repository.Delete(geometry);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<Geometry> UpdateGeometryAsync(long id, GeometryDto geometryDto)
        {
            var repository = _unitOfWork.Repository<Geometry>();
            var geometry = await this.GetGeometryByIdAsync(id);
            geometry.Wkt = geometryDto.Wkt;
            geometry.Name = geometryDto.Name;

            repository.Update(geometry);
            await _unitOfWork.SaveChangesAsync();
            return geometry;
        }

    }
}
