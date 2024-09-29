using locamark.Data;
using locamark.Interfaces;
using locamark.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace locamark.Repositories
{
    public class GeometryRepository : GenericRepository<Geometry>, IGeometryRepository
    {
        public GeometryRepository(ApplicationDatabaseContext context) : base(context)
        {
        }

        public async Task<Geometry> GetGeometryByIdAsync(long id, string userId)
        {
            var relatedGeometry = await _dbSet.FirstOrDefaultAsync(g => g.AppUserId == userId && g.Id == id);
            if (relatedGeometry == null) throw new KeyNotFoundException("Entity Not Found");
            return relatedGeometry;
        }

        public async Task<List<Geometry>> GetAllGeometriesAsync(string userId)
        {
            var geometries = await _dbSet.Where(g => g.AppUserId == userId).Select(geometry => new Geometry
            {
                Id = geometry.Id,
                Name = geometry.Name,
                Wkt = geometry.Wkt,
                AppUserId = userId
            }).ToListAsync();
            return geometries;
        }
    }
}
