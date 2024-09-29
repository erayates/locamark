using locamark.Models;

namespace locamark.Interfaces
{
    public interface IGeometryRepository: IGenericRepository<Geometry>
    {
        public Task<Geometry> GetGeometryByIdAsync(long id, string userId);
        public Task<List<Geometry>> GetAllGeometriesAsync(string userId);


    }
}
