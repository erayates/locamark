using locamark.Data;
using locamark.Interfaces;
using locamark.Models;
using Microsoft.EntityFrameworkCore;

namespace locamark.Repositories
{
    public class PointRepository : GenericRepository<Point>, IPointRepository
    {
        //private readonly ApplicationDatabaseContext _pointDbContext;

        //public PointRepository(ApplicationDatabaseContext pointDbContext) : base(pointDbContext)
        //{
        //    _pointDbContext = pointDbContext;
        //}

        public PointRepository(ApplicationDatabaseContext context) : base(context)
        {
        }


        // Generic repository içerisinde bulunan CRUD operasyonu dışında farklı bir request atmak istersek
        public async Task<IEnumerable<Point>> GetPointByNameAsync(string name)
        {
            return await _dbSet.Where(x => x.Name == name).ToListAsync();
        }



        //public async Task<Point> AddPointAsync(Point point)
        //{
        //    _unitOfWork.Points.Add(point);
        //    await _unitOfWork.SaveChangesAsync();
        //    return point;
        //}

        //public async Task<IEnumerable<Point>> GetAllPointsAsync()
        //{

        //    return _unitOfWork.Points.GetAll();
        //}

        //public async Task<Point> GetPointByIdAsync(long id)
        //{
        //    return _unitOfWork.Points.GetById(id);
        //}

        //public async Task DeletePointAsync(long id)
        //{
        //    _unitOfWork.Points.Delete(id);
        //    await _unitOfWork.SaveChangesAsync();
        //}


        //public IEnumerable<Point> GetPointByName(string name)
        //{
        //    return _dbSet.Where(x => x.Name == name).ToList();
        //}


        // Returns all points asynchronously
        //public async Task<List<Point>> GetAll()
        //{
        //    return await _context.Point.ToListAsync();
        //}

        //// Returns a specific point by id.
        //public async Task<Point> GetById(long id)
        //{
        //    var point = await _context.Point.FirstOrDefaultAsync(p => p.Id == id);
        //    if (point == null) throw new KeyNotFoundException("Böyle bir point bulunamadı.");
        //    return point;
        //}

        //// Adds a point
        //public async Task Add(Point point)
        //{
        //    await _context.Point.AddAsync(point);
        //    await _context.SaveChangesAsync();
        //}

        //// Updates a point
        //public async Task<Point?> Update(long id, Point updatedPoint)
        //{
        //    var point = await GetById(id);
        //    point.Name = updatedPoint.Name;
        //    point.PointX = updatedPoint.PointX;
        //    point.PointY = updatedPoint.PointY;
        //    await _context.SaveChangesAsync();
        //    return point;
        //}

        //// Removes a point
        //public async Task Delete(long id)
        //{
        //    var point = await GetById(id);
        //    _context.Point.Remove(point);
        //    await _context.SaveChangesAsync();
        //}
    }
}
