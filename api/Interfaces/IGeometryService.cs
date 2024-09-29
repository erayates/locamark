// IGeometryService.cs
using locamark.Dtos;
using locamark.Models;

public interface IGeometryService
{
    Task<Geometry> AddGeometryAsync(GeometryDto geometryDto, ApplicationUser appUser);
    Task DeleteGeometryAsync(long id, ApplicationUser appUser);
    Task<List<Geometry>> GetAllGeometriesAsync(ApplicationUser appUser);

    Task<Geometry> GetGeometryByIdAsync(long id, ApplicationUser appUser);
    Task<Geometry> UpdateGeometryAsync(long id, GeometryDto geometryDto, ApplicationUser appUser);
}
