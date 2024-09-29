using locamark.Dtos;
using locamark.Interfaces;
using locamark.Models;
using System.Security.Claims;

namespace locamark.Services
{
    public class GeometryService : IGeometryService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IGeometryRepository _geometryRepository;

        public GeometryService(IUnitOfWork unitOfWork, IGeometryRepository geometryRepository)
        {
            _unitOfWork = unitOfWork;
            _geometryRepository = geometryRepository;
        }

        public async Task<List<Geometry>> GetAllGeometriesAsync(ApplicationUser appUser)
        {
            var userGeometries = await _geometryRepository.GetAllGeometriesAsync(appUser.Id);
            return userGeometries;
        }


        public async Task<Geometry> GetGeometryByIdAsync(long id, ApplicationUser appUser)
        {
            var geometry = await _geometryRepository.GetGeometryByIdAsync(id, appUser.Id);
            return geometry;
        }

        public async Task<Geometry> AddGeometryAsync(GeometryDto geometryDto, ApplicationUser appUser)
        {

            var newGeometry = new Geometry
            {
                Name = geometryDto.Name,
                Wkt = geometryDto.Wkt,
                AppUserId = appUser.Id
            };

            await _geometryRepository.AddAsync(newGeometry);
            await _unitOfWork.SaveChangesAsync();
            return newGeometry;
        }

        public async Task DeleteGeometryAsync(long id, ApplicationUser appUser)
        {
            var geometry = await _geometryRepository.GetGeometryByIdAsync(id, appUser.Id);
            _geometryRepository.Delete(geometry);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<Geometry> UpdateGeometryAsync(long id, GeometryDto geometryDto, ApplicationUser appUser)
        {
            var geometry = await _geometryRepository.GetGeometryByIdAsync(id, appUser.Id);
            
            geometry.Name = geometryDto.Name;
            geometry.Wkt = geometryDto.Wkt;

            await _unitOfWork.SaveChangesAsync();
            return geometry;
        }
    }
}
